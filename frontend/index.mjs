import path from "path";

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
          { name: "config", value: "config" },
          { name: "Cucumber", value: "cucumber" },
          { name: "Express Webserver", value: "express" },
          { name: "Imposter", value: "imposter" },
        ],
      },
    ],
    actions: function (data) {
      data.criName = path.basename(plop.getDestBasePath());
      const actions = [];

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

      if (data.initOptions.includes("config")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates/config",
          templateFiles: "templates/config/*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });
      }

      return actions;
    },
  });
}
