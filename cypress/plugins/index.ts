// cypress/plugins/index.js
module.exports = (on: any, config: any) => {
    // Allow Clerk's domains
    config.env.whitelist = ['clerk.dev', 'clerk.com'];
    return config;
  };