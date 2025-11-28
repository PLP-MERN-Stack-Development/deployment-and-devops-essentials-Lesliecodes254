// healthcheck.js - Health Monitoring Script
// Run this script periodically to check application health

const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  backend: {
    url: process.env.BACKEND_URL || 'http://localhost:5000',
    endpoint: '/health'
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000'
  },
  slack_webhook: process.env.SLACK_WEBHOOK_URL,
  email: process.env.ALERT_EMAIL
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

// Health check function
async function checkHealth(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const startTime = Date.now();
    
    const req = protocol.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          responseTime,
          healthy: res.statusCode === 200,
          data: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        status: 0,
        responseTime: Date.now() - startTime,
        healthy: false,
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        status: 0,
        responseTime: 10000,
        healthy: false,
        error: 'Timeout'
      });
    });
  });
}

// Send alert function
async function sendAlert(message) {
  console.log(`${colors.red}ALERT: ${message}${colors.reset}`);
  
  // Send to Slack if configured
  if (CONFIG.slack_webhook) {
    try {
      const payload = JSON.stringify({
        text: `🚨 Health Check Alert: ${message}`,
        username: 'Health Monitor',
        icon_emoji: ':hospital:'
      });

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length
        }
      };

      const url = new URL(CONFIG.slack_webhook);
      await new Promise((resolve, reject) => {
        const req = https.request(url, options, resolve);
        req.on('error', reject);
        req.write(payload);
        req.end();
      });
    } catch (error) {
      console.error('Failed to send Slack alert:', error.message);
    }
  }
}

// Main health check
async function runHealthCheck() {
  console.log('\n' + '='.repeat(50));
  console.log('🏥 Running Health Check...');
  console.log('Time:', new Date().toISOString());
  console.log('='.repeat(50) + '\n');

  const results = {
    timestamp: new Date().toISOString(),
    checks: {}
  };

  // Check Backend
  console.log('Checking Backend API...');
  const backendUrl = `${CONFIG.backend.url}${CONFIG.backend.endpoint}`;
  const backendHealth = await checkHealth(backendUrl);
  results.checks.backend = backendHealth;

  if (backendHealth.healthy) {
    console.log(`${colors.green}✓ Backend is healthy${colors.reset}`);
    console.log(`  Status: ${backendHealth.status}`);
    console.log(`  Response Time: ${backendHealth.responseTime}ms`);
    if (backendHealth.data) {
      console.log(`  Uptime: ${Math.floor(backendHealth.data.uptime / 60)}m`);
      console.log(`  Environment: ${backendHealth.data.environment}`);
    }
  } else {
    console.log(`${colors.red}✗ Backend is unhealthy${colors.reset}`);
    console.log(`  Error: ${backendHealth.error || 'Unknown error'}`);
    await sendAlert(`Backend is down! Error: ${backendHealth.error}`);
  }

  // Check Frontend
  console.log('\nChecking Frontend...');
  const frontendHealth = await checkHealth(CONFIG.frontend.url);
  results.checks.frontend = frontendHealth;

  if (frontendHealth.healthy) {
    console.log(`${colors.green}✓ Frontend is accessible${colors.reset}`);
    console.log(`  Status: ${frontendHealth.status}`);
    console.log(`  Response Time: ${frontendHealth.responseTime}ms`);
  } else {
    console.log(`${colors.red}✗ Frontend is inaccessible${colors.reset}`);
    console.log(`  Error: ${frontendHealth.error || 'Unknown error'}`);
    await sendAlert(`Frontend is down! Error: ${frontendHealth.error}`);
  }

  // Overall status
  const allHealthy = Object.values(results.checks).every(check => check.healthy);
  
  console.log('\n' + '='.repeat(50));
  if (allHealthy) {
    console.log(`${colors.green}✓ All systems operational${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Some systems are down${colors.reset}`);
  }
  console.log('='.repeat(50) + '\n');

  // Save results to file
  const fs = require('fs');
  const logDir = './logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = `${logDir}/health-check-${new Date().toISOString().split('T')[0]}.json`;
  let logs = [];
  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  }
  logs.push(results);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

  return allHealthy;
}

// Run if called directly
if (require.main === module) {
  runHealthCheck()
    .then(healthy => process.exit(healthy ? 0 : 1))
    .catch(error => {
      console.error('Health check failed:', error);
      process.exit(1);
    });
}

module.exports = { runHealthCheck, checkHealth };
