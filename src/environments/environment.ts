export const environment = {
  production: false,
  apiUrl: process.env['NG_APP_API_URL'],
  realm: 'vivada',
  clientId: 'vivada-local',
  testMessage: process.env['NG_APP_TEST_MESSAGE'] || 'You will only see this message in dev branch and process.env.NG_APP_TEST_MESSAGE is not set'
};
