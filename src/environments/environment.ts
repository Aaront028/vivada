export const environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'apiUrl',
  hasuraAdminSecret: process.env['HASURA_ADMIN_SECRET'] || 'hasuraAdminSecret',
  // Add other variables as needed
};
