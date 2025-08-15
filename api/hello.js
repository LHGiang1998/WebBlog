// Simple API endpoint for Vercel
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hoài Giang Automation Blog API is working!',
    timestamp: new Date().toISOString()
  });
}
