module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_AUTH_URL: process.env.API_AUTH_URL,
    API_LOCATION_URL: process.env.API_LOCATION_URL,
    API_CART_URL: process.env.API_CART_URL,
    API_ADDRESS_URL: process.env.API_ADDRESS_URL,
    API_VOUCHER_URL: process.env.API_VOUCHER_URL,
    API_ORDER_URL: process.env.API_ORDER_URL,
  },
};
