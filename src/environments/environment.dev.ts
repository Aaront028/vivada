export const environment = {
  production: false,
  apiUrl: process.env["API_URL"] || 'default_api_url',
  hasuraAdminSecret: process.env["HASURA_ADMIN_SECRET"] || 'default_hasura_admin_secret',
  // Add other variables as needed
};