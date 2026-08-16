const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Client Acquisition Platform Backend API`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🔒 Admin Auth: http://localhost:${PORT}/api/auth/login`);
    console.log(`======================================================\n`);
  });
};

startServer();
