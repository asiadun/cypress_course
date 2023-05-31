const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kaccqs',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: '**/e2e/**/*.js'
  },
});
