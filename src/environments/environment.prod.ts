export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'apiUrl',
  hasuraAdminSecret: process.env['HASURA_ADMIN_SECRET'] || 'hasuraAdminSecret',
  // Add other variables as needed
};
