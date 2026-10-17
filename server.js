// Startup file for cPanel "Setup Node.js App" (Phusion Passenger) and other hosts
// that need a plain Node entry file. Run "npm run build" first.
const { execSync } = require('child_process');
const { createServer } = require('http');
const path = require('path');

// Create/update database tables and load the starting content (only if empty)
try {
  execSync('npx prisma db push --skip-generate && node prisma/seed.mjs', { cwd: __dirname, stdio: 'inherit' });
} catch (e) {
  console.error('Database preparation failed:', e.message);
}

const next = require('next');
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: false, dir: path.resolve(__dirname) });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> RAK Golden Visa ready on port ${port}`);
  });
});
