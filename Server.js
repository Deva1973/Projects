const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows cross-origin requests from your React app
app.use(express.json()); // Parses incoming JSON payloads

// POST endpoint for Pilot Signup
app.post('/pilot', (req, res) => {
  const { org, contact, email, phone, city, notes } = req.body;

  // Basic server-side validation
  if (!org || !contact || !email || !phone || !city) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Log the data (In production, save to DB like MongoDB or PostgreSQL)
  console.log('--- New Pilot Request ---');
  console.log(`Organization: ${org}`);
  console.log(`Contact: ${contact} (${email}, ${phone})`);
  console.log(`City: ${city}`);
  console.log(`Notes: ${notes}`);
  console.log('-------------------------');

  // Return success response
  return res.status(200).json({
    success: true,
    message: 'Pilot request received successfully'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`MedRoute API Server running on port ${PORT}`);
});
