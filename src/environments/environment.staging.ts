export const environment = {
  production: true,
  apiUrl: process.env['NG_APP_API_URL'],
  realm: 'vivada',
  clientId: 'vivada-online',
  testMessage: process.env['NG_APP_TEST_MESSAGE'] || 'You will only see this message in staging branch and process.env.NG_APP_TEST_MESSAGE is not set'
};

