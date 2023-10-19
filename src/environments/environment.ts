export const environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'default_api_url',
  hasuraAdminSecret: process.env['HASURA_ADMIN_SECRET'] || 'secret_key',
  // Add other variables as needed
};
