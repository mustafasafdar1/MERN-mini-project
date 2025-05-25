// server.js
const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('ERROR:', err.stack);
  console.error('💥 Shutting down server due to uncaught exception');
  process.exit(1);
});

// Config
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDatabase();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('ERROR:', err.message);
  console.error('💥 Shutting down the server due to Unhandled Promise rejection');

  server.close(() => {
    process.exit(1);
  });
});
