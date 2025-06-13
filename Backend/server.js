const express = require('express');
const multer = require('multer');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json());

const QUEUE_NAME = 'image_jobs';
const RESULT_PREFIX = 'result:';

app.post('/api/recommend', upload.single('image'), async (req, res) => {
  try {
    const { dress_type } = req.body;
    console.log("Recccccc");
    if (!req.file || !dress_type) {
      return res.status(400).json({ error: 'Image and dress_type required' });
    }

    const jobId = uuidv4();
    const jobData = {
      id: jobId,
      dress_type,
      image: req.file.buffer.toString('base64'),
      timestamp: Date.now()
    };
    
    await redis.lpush(QUEUE_NAME, JSON.stringify(jobData));
    await redis.setex(`${RESULT_PREFIX}${jobId}`, 600, JSON.stringify({ status: 'queued' }));
    
    const queueLength = await redis.llen(QUEUE_NAME);
    
    res.json({ 
      jobId, 
      status: 'queued',
      estimatedWait: Math.ceil(queueLength * 30),
      position: queueLength
    });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/status/:jobId', async (req, res) => {
  try {
    const result = await redis.get(`${RESULT_PREFIX}${req.params.jobId}`);
    
    if (!result) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(JSON.parse(result));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
