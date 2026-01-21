/**
 * Real-Time AI Pizza Ordering Assistant
 * Production-ready server with modular architecture
 * 
 * Twilio Media Streams + OpenAI Realtime API
 */

require('dotenv').config();

const express = require('express');
const WebSocket = require('ws');
const { validateEnv, sanitizeForLog } = require('./src/utils/validation');
const handleIncomingCall = require('./src/routes/incoming-call');
const setupMediaStream = require('./src/routes/media-stream');
const healthCheck = require('./src/routes/health');
const Logger = require('./src/services/logger');
const { getBusinessName, getBusinessConfig } = require('./src/config/business');

// #region agent log
fetch('http://127.0.0.1:7244/ingest/568a64c9-92ee-463b-a9e1-63b6aaa39ebb',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server-new.js:startup',message:'SERVER_NEW_JS_STARTING',data:{serverFile:'server-new.js',businessName:process.env.BUSINESS_NAME,businessNameFromConfig:getBusinessName(),fullConfig:getBusinessConfig()},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A_server_file'})}).catch(()=>{});
// #endregion

// Log branding at startup (visible in Railway logs)
console.log('========================================');
console.log('🏪 BRANDING CONFIGURATION LOADED');
console.log('========================================');
console.log(`📛 BUSINESS_NAME env var: ${process.env.BUSINESS_NAME || '(NOT SET - using default)'}`);
console.log(`📛 Resolved business name: ${getBusinessName()}`);
console.log(`📛 Full config: ${JSON.stringify(getBusinessConfig())}`);
console.log('========================================');
console.log('🔥 THIS IS server-new.js (NOT server.js)');
console.log('========================================');

// Validate environment variables at startup
try {
  validateEnv();
} catch (error) {
  console.error('❌ Startup validation failed:', error.message);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request logging middleware (sanitized)
app.use((req, res, next) => {
  const logData = sanitizeForLog({
    method: req.method,
    path: req.path,
    query: req.query
  });
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`, logData);
  next();
});

// Routes
app.post('/incoming-call', handleIncomingCall);
app.get('/health', healthCheck);

// WebSocket server for Media Streams
// Listen on 0.0.0.0 for Railway deployment (allows external connections)
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 Server listening on all interfaces (0.0.0.0) for Railway deployment`);
  console.log(`📞 Incoming call webhook: POST /incoming-call`);
  console.log(`📡 Media stream WebSocket: /media-stream`);
  console.log(`❤️  Health check: GET /health`);
});

const wss = new WebSocket.Server({ noServer: true });

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  
  if (pathname === '/media-stream') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Initialize logger
const logger = new Logger(
  process.env.ZAPIER_WEBHOOK_URL,
  3, // max retries
  1000 // initial retry delay (ms)
);

// Setup media stream handler
setupMediaStream(wss, logger);

// Periodic cleanup to prevent resource accumulation
setInterval(() => {
  // Clean up any stale resources if needed
  // This is handled by the services themselves
  console.log(`📊 Server health check - ${new Date().toISOString()}`);
}, 300000); // Every 5 minutes

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

console.log('✓ Server initialized and ready to accept calls');





