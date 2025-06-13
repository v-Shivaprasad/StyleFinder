const Redis = require('ioredis');
const FormData = require('form-data');
const fetch = require('node-fetch');

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const FASTAPI_URL = process.env.FASTAPI_URL;
const MAX_CONCURRENT = parseInt(process.env.MAX_CONCURRENT_JOBS) || 2;

const QUEUE_NAME = 'image_jobs';
const RESULT_PREFIX = 'result:';

let activeJobs = 0;

async function processJob(jobData) {
  const { id, dress_type, image } = jobData;
  
  try {
    console.log(`Processing job ${id}`);
    
    await redis.setex(`${RESULT_PREFIX}${id}`, 600, JSON.stringify({ 
      status: 'processing', 
      startTime: Date.now() 
    }));
    
    const imageBuffer = Buffer.from(image, 'base64');
    
    const formData = new FormData();
    formData.append('image', imageBuffer, { filename: 'image.jpg' });
    formData.append('dress_type', dress_type);
    
    const response = await fetch(`${FASTAPI_URL}/recommend`, {
      method: 'POST',
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
        ...formData.getHeaders()
      },
      timeout: 120000
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const result = await response.json();
    
    await redis.setex(`${RESULT_PREFIX}${id}`, 600, JSON.stringify({
      status: 'completed',
      result,
      completedAt: Date.now()
    }));
    
    console.log(`Job ${id} completed`);
    
  } catch (error) {
    console.error(`Job ${id} failed:`, error);
    
    await redis.setex(`${RESULT_PREFIX}${id}`, 600, JSON.stringify({
      status: 'failed',
      error: error.message,
      failedAt: Date.now()
    }));
  }
}

async function worker() {
  console.log('Worker started');
  
  while (true) {
    try {
      if (activeJobs >= MAX_CONCURRENT) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
      
      const jobStr = await redis.brpop(QUEUE_NAME, 5);
      
      if (jobStr) {
        const jobData = JSON.parse(jobStr[1]);
        activeJobs++;
        
        processJob(jobData).finally(() => {
          activeJobs--;
        });
      }
      
    } catch (error) {
      console.error('Worker error:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

worker();
