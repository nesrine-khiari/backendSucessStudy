export { };
const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true
});

const env = process.env; // this has ".env" keys & values
// let adminToken = '';

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  socketEnabled: ['1', 'true', 'yes'].indexOf(env.SOCKET_ENABLED || '') >= 0,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRATION_MINUTES: env.JWT_EXPIRATION_MINUTES,
  UPLOAD_LIMIT: 20, // MB
  EMAIL_TEMPLATE_BASE: path.join(__dirname, '../templates/emails/'),
  EMAIL_NODEMAILER: env.EMAIL_NODEMAILER,
  PASSWORD_EMAIL: env.PASSWORD_EMAIL,
  EMAIL_HOST: env.EMAIL_HOST,
  EMAIl_PORT: env.EMAIL_PORT,
  EMAIL_SECURE: env.EMAIL_SECURE,
  // setAdminToken: (admToken: string) => (adminToken = admToken),
  mongo: {
    user: env.MONGO_USER,
    pass: env.MONGO_PASS,
    uri: env.MONGO_URI
  },
  logs: env.NODE_ENV === 'production' ? 'combined' : 'dev'
};
