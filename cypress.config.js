const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'e1jeu9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});