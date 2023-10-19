export const environment = {
  production: true,
  apiUrl: process.env.apiUrl || 'default_api_url',
  hasuraAdminSecret: process.env.hasuraAdminSecret || 'secret_key'
};