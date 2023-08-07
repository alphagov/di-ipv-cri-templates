export default async function (plop) {
  plop.setGenerator("frontend:init", {
    description: "Init a FE with general configuration",
    prompts: [
      {
        type: "input",
        name: "criName",
        message: "CRI Name?",
      },
      {
        type: "input",
        name: "mainRoute",
        message: "URL path for the main route?",
      },
      {
        type: "checkbox",
        name: "initOptions",
        message: "What would you like to initialise?",
        choices: [
          { name: ".dotfiles", value: "dotfiles" },
          { name: "npm", value: "npm" },
          { name: "Express Webserver", value: "express" },
          { name: "Cucumber", value: "cucumber" },
        ],
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.initOptions.includes("dotfiles")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates",
          templateFiles: "templates/.*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });
      }

      if (data.initOptions.includes("npm")) {
        actions.push({
          type: "add",
          path: "package.json",
          templateFile: "templates/package.json.hbs",
          verbose: true,
          skipIfExists: true,
        });

        actions.push({
          type: "add",
          path: "jest.config.js",
          templateFile: "templates/jest.config.js",
          verbose: true,
          skipIfExists: true,
        });
      }

      if (data.initOptions.includes("express")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/express",
          templateFiles: "**",
          globOptions: { dot: true },
          verbose: true,
        });
      }

      if (data.initOptions.includes("cucumber")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/cucumber",
          templateFiles: "**/*",
          globOptions: { dot: true },
          verbose: true,
        });
      }

      return actions;
    },
  });
}
