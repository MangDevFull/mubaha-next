module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_AUTH_URL: process.env.API_AUTH_URL,
    API_LOCATION_URL: process.env.API_LOCATION_URL
  },
};
