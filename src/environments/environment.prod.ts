export const environment = {
  production: true,
  apiUrl: process.env.API_URL || 'default_api_url',
  hasuraAdminSecret: process.env.HASURA_ADMIN_SECRET || 'default_hasura_admin_secret',
  // Add other variables as needed
};