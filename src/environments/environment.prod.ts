export const environment = {
  production: true,
  apiUrl: process.env["API_URL"] || 'default_api_url',
  hasuraAdminSecret: process.env["hasuraAdminSecret"] || 'secret_key'
};