export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'default_api_url',
  hasuraAdminSecret: process.env['HASURA_ADMIN_SECRET'] || 'secret_key',
  // Add other variables as needed
};
