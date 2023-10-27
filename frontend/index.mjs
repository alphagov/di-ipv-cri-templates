export default async function (plop) {
  plop.setGenerator("frontend:init", {
    description: "Init a FE with general configuration",
    prompts: [
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
          { name: "Cucumber", value: "cucumber" },
          { name: "Express Webserver", value: "express" },
          { name: "Imposter", value: "imposter" },
          { name: "npm", value: "npm" },
        ],
      },
    ],
    actions: function (data) {
      data.criName = plop.getDestBasePath().split("/").slice(-1)[0];
      const actions = [];

      if (data.initOptions.includes("dotfiles")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/dotfiles",
          templateFiles: "templates/dotfiles/.*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
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

      if (data.initOptions.includes("imposter")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/imposter",
          templateFiles: "**/*",
          globOptions: { dot: true },
          verbose: true,
        });
      }

      if (data.initOptions.includes("npm")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/npm",
          templateFiles: "templates/npm/*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });
      }

      return actions;
    },
  });
}
