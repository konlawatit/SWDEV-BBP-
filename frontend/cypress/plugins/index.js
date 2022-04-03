module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);
  require("cypress-mochawesome-reporter/plugin")(on);
  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
