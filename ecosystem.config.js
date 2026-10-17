// PM2 process file (VPS): pm2 start ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: 'rak-golden-visa',
      script: 'server.js',
      cwd: __dirname,
      env: { NODE_ENV: 'production', PORT: 3000 },
      max_memory_restart: '700M',
    },
  ],
};
