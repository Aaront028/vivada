export const environment = {
  production: false,
  apiUrl: process.env.apiUrl || 'default_api_url',
  hasuraAdminSecret: process.env.hasuraAdminSecret || 'secret_key'
};