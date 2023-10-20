export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'YOUR_DEFAULT_API_URL',
  hasuraAdminSecret: process.env['API_KEY'] || 'YOUR_DEFAULT_API_KEY',
  realm: 'vivada-ui-online',
};
