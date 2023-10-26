export const environment = {
  production: false,
  apiUrl: process.env['NG_APP_API_URL'],
  hasuraAdminSecret: process.env['NG_APP_HASURA_ADMIN_SECRET'],
  realm: 'vivada',
  clientId: 'vivada-local',
  testMessage: 'You will only see this in dev branch'
};

