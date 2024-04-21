const path = require('path');

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ucarecdn.com',
            port: '',
            pathname: '/**',
          },
    ],
  },
  env: {
        UPLOADCARE_PUBKEY: process.env.UPLOADCARE_PUBKEY, // pulls from .env file
        BACKEND_URL: process.env.BACKEND_URL, // pulls from .env file
  },
  poweredByHeader: false,
  webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, '.');
        return config;
      },
      // Currently if accessing root path, just direct to login.
      //  TO-DO: maybe update so root path can point to landing page of
      //   foldouts app not hosted in the web application (storefront view)
       async redirects() {
          return [
            {
              source: '/',
              destination: '/user/wish-list',
              permanent: false,
            },
            {
              source: '/login',
              destination: '/user-wish-list',
              permanent: false,
            },
            {
              source: '/logout',
              destination: '/api/auth/logout',
              permanent: false,
            },
          ];
        },

};
