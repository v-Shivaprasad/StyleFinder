// Mock API function to simulate the POST request
// Replace this with your actual API endpoint
// export const searchSimilarProducts = async (imageFile, dressType = 'dresses') => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   // Mock response data based on category using the new format
//   const mockDresses = [
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg",
//       product_name: "Floral Maxi Dress with Elegant Print",
//       brand: "Zivame",
//       mrp: { "INR": 2499 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg",
//         "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg",
//         "https://images.pexels.com/photos/1267049/pexels-photo-1267049.jpeg"
//       ],
//       pdp_url: "https://www.zivame.com/floral-maxi-dress",
//       description: "Beautiful floral maxi dress perfect for summer occasions. Features a flowing silhouette with vibrant floral prints and comfortable fabric blend."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg",
//       product_name: "Casual Summer Dress",
//       brand: "H&M",
//       mrp: { "INR": 1299 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg",
//         "https://images.pexels.com/photos/1267049/pexels-photo-1267049.jpeg"
//       ],
//       pdp_url: "https://www2.hm.com/casual-summer-dress",
//       description: "Light and breezy summer dress ideal for casual outings. Made with breathable cotton blend for all-day comfort."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1267049/pexels-photo-1267049.jpeg",
//       product_name: "Elegant Evening Gown",
//       brand: "Forever 21",
//       mrp: { "INR": 3199 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1267049/pexels-photo-1267049.jpeg",
//         "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg"
//       ],
//       pdp_url: "https://www.forever21.com/elegant-evening-gown",
//       description: "Sophisticated evening gown with intricate detailing. Perfect for formal events and special occasions."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg",
//       product_name: "Boho Chic Dress",
//       brand: "Vero Moda",
//       mrp: { "INR": 2199 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg"
//       ],
//       pdp_url: "https://www.veromoda.com/boho-chic-dress",
//       description: "Trendy boho-style dress with unique patterns and relaxed fit. Ideal for festival looks and casual gatherings."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg",
//       product_name: "Printed A-Line Dress",
//       brand: "Only",
//       mrp: { "INR": 1799 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg",
//         "https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg"
//       ],
//       pdp_url: "https://www.only.com/printed-aline-dress",
//       description: "Classic A-line dress with modern prints. Versatile piece that transitions from day to night effortlessly."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
//       product_name: "Vintage Style Dress",
//       brand: "Myntra",
//       mrp: { "INR": 2299 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
//       ],
//       pdp_url: "https://www.myntra.com/vintage-style-dress",
//       description: "Retro-inspired dress with vintage charm. Features classic silhouette with modern comfort and quality."
//     }
//   ];

//   const mockJeans = [
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
//       product_name: "Classic Blue Jeans",
//       brand: "Levi's",
//       mrp: { "INR": 3499 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
//         "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg"
//       ],
//       pdp_url: "https://www.levi.com/classic-blue-jeans",
//       description: "Timeless classic blue jeans with perfect fit and premium denim quality. A wardrobe essential for every style."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
//       product_name: "Skinny Fit Jeans",
//       brand: "Zara",
//       mrp: { "INR": 2799 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
//         "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
//       ],
//       pdp_url: "https://www.zara.com/skinny-fit-jeans",
//       description: "Modern skinny fit jeans with stretch comfort. Designed for a sleek silhouette and all-day wearability."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
//       product_name: "Distressed Denim",
//       brand: "H&M",
//       mrp: { "INR": 2199 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg"
//       ],
//       pdp_url: "https://www2.hm.com/distressed-denim",
//       description: "Trendy distressed denim with authentic worn-in look. Perfect for casual styling and street fashion."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg",
//       product_name: "High Waist Jeans",
//       brand: "Forever 21",
//       mrp: { "INR": 1899 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg",
//         "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg"
//       ],
//       pdp_url: "https://www.forever21.com/high-waist-jeans",
//       description: "Flattering high-waist jeans that elongate the silhouette. Combines vintage appeal with contemporary comfort."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg",
//       product_name: "Straight Leg Jeans",
//       brand: "Wrangler",
//       mrp: { "INR": 3199 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg"
//       ],
//       pdp_url: "https://www.wrangler.com/straight-leg-jeans",
//       description: "Classic straight leg jeans with timeless appeal. Crafted from premium denim for durability and style."
//     },
//     {
//       feature_image_s3: "https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg",
//       product_name: "Bootcut Jeans",
//       brand: "Lee",
//       mrp: { "INR": 2599 },
//       pdp_images_s3: [
//         "https://images.pexels.com/photos/1598511/pexels-photo-1598511.jpeg",
//         "https://images.pexels.com/photos/1598510/pexels-photo-1598510.jpeg"
//       ],
//       pdp_url: "https://www.lee.com/bootcut-jeans",
//       description: "Versatile bootcut jeans with a flattering fit. Ideal for pairing with boots or heels for various occasions."
//     }
//   ];

//   // Simulate potential API error (5% chance)
//   if (Math.random() < 0.05) {
//     throw new Error('API Error: Failed to process image');
//   }

//   return dressType === 'jeans' ? mockJeans : mockDresses;
// };

// Uncomment and modify this function when integrating with your actual API


//Direct to FastApi
// export const searchSimilarProducts = async (imageFile, dressType) => {
//   const formData = new FormData();
//   formData.append('image', imageFile);
//   formData.append('dress_type', dressType);
  
//   try {
//     const response = await fetch('https://0c4e-34-125-203-133.ngrok-free.app/recommend', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         "ngrok-skip-browser-warning": true,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('API Response:', data); // Log the parsed data
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };


export const searchSimilarProducts = async (imageFile, dressType, onProgress = null) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('dress_type', dressType);
  
  try {
    // Step 1: Submit job to queue
    const submitResponse = await fetch('http://localhost:3000/api/recommend', {
      method: 'POST',
      body: formData,
    });
    
    if (!submitResponse.ok) {
      const errorData = await submitResponse.json();
      throw new Error(errorData.error || `HTTP error! status: ${submitResponse.status}`);
    }
    
    const { jobId, status, estimatedWait, position } = await submitResponse.json();
    
    console.log(`Job submitted: ${jobId}`);
    console.log(`Position in queue: ${position}, estimated wait: ${estimatedWait}s`);
    
    // Notify about queue position if callback provided
    if (onProgress) {
      onProgress({
        status: 'queued',
        message: `You are #${position} in queue. Estimated wait: ${Math.ceil(estimatedWait / 60)} minutes`,
        position,
        estimatedWait
      });
    }
    
    // Step 2: Poll for results
    const result = await pollJobResult(jobId, onProgress);
    return result;
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Polling function with exponential backoff
const pollJobResult = async (jobId, onProgress = null, maxAttempts = 120) => {
  let attempt = 0;
  
  while (attempt < maxAttempts) {
    try {
      const response = await fetch(`http://localhost:8080/api/status/${jobId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Job not found - it may have expired');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Job ${jobId} status: ${data.status}`);
      
      // Update progress
      if (onProgress) {
        if (data.status === 'queued') {
          onProgress({
            status: 'queued',
            message: 'Waiting in queue...',
            attempt: attempt + 1
          });
        } else if (data.status === 'processing') {
          onProgress({
            status: 'processing',
            message: 'Processing your image...',
            startTime: data.startTime
          });
        }
      }
      
      // Job completed successfully
      if (data.status === 'completed') {
        if (onProgress) {
          onProgress({
            status: 'completed',
            message: 'Processing complete!'
          });
        }
        return data.result;
      }
      
      // Job failed
      if (data.status === 'failed') {
        throw new Error(`Processing failed: ${data.error}`);
      }
      
      // Calculate wait time with exponential backoff
      // Start with 2s, gradually increase to max 10s
      const baseWait = 2000;
      const maxWait = 10000;
      const waitTime = Math.min(baseWait + (attempt * 300), maxWait);
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      attempt++;
      
    } catch (error) {
      console.error(`Polling attempt ${attempt + 1} failed:`, error);
      
      // If it's the last attempt, throw the error
      if (attempt === maxAttempts - 1) {
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 3000));
      attempt++;
    }
  }
  
  throw new Error('Request timeout - processing took too long. Please try again.');
};