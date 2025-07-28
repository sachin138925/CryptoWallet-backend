const serverlessExpress = require('@vendia/serverless-express');
const app = require('../server'); // Import your existing Express app

module.exports = serverlessExpress({ app });
