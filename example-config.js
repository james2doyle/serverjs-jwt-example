module.exports = {
  jwtSecret: 'run "openssl rand -base64 32" to generate a token',
  jwtOptions: {
    expiresIn: 7200, // 120 minutes or 2 hours
  },
  serverConfig: {
    security: {
      csrf: false,
    },
    port: 3000,
  },
};
