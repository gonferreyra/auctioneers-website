const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};

// ENVIROMENT
export const NODE_ENV = getEnv('NODE_ENV');

// FRONTEND URL
export const APP_ORIGIN = getEnv('APP_ORIGIN');

// SERVER
export const SERVER_PORT = getEnv('SERVER_PORT');
export const SERVER_HOSTNAME = getEnv('SERVER_HOSTNAME');

// DB
export const DB_NAME = getEnv('DB_NAME');
export const DB_USER = getEnv('DB_USER');
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_PORT = getEnv('DB_PORT');
export const DB_HOST = getEnv('DB_HOST');

// JWT
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');

// RESEND
export const RESEND_API_KEY = getEnv('RESEND_API_KEY');
export const EMAIL_SENDER = getEnv('EMAIL_SENDER');
