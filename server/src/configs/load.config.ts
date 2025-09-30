export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  PORT: process.env.PORT,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  MAILTRAP_SMTP_HOST: process.env.MAILTRAP_SMTP_HOST,
  MAILTRAP_SMTP_PORT: process.env.MAILTRAP_SMTP_PORT,
  MAILTRAP_SMTP_USER: process.env.MAILTRAP_SMTP_USER,
  MAILTRAP_SMTP_PASSWORD: process.env.MAILTRAP_SMTP_PASSWORD,
});