export default async function (plop) {
  plop.setGenerator("frontend:new:page", {
    description: "Add a new page",
    prompts: [
      {
        type: "input",
        name: "mainRoute",
        message:
          "What is the URL path for the main route? (without a / prefix)",
        filter: (input) => {
          return input;
        },
      },
      {
        type: "input",
        name: "pageName",
        message: "What is the name of the new page",
      },
      {
        type: "input",
        name: "nextStep",
        message: "What should be the next step after this one?",
      },
      {
        type: "confirm",
        name: "hasController",
        message: "Does this step have a controller?",
        default: "N",
      },
    ],
    actions: function (data) {
      console.log(data);

      const actions = [];

      actions.push({
        type: "append",
        pattern: "module.exports = {",
        path: "src/app/{{kebabCase mainRoute}}/steps.js",
        templateFile: "templates/page/src/app/_route_/step.fragment.js.hbs",
        verbose: true,
      });

      actions.push({
        type: "append",
        // pattern: "$",
        path: "src/locales/en/pages.yml",
        templateFile: "templates/page/src/locales/pages.fragment.yml.hbs",
        verbose: true,
      });

      actions.push({
        type: "append",
        // pattern: "$",
        path: "src/locales/cy/pages.yml",
        templateFile: "templates/page/src/locales/pages.fragment.yml.hbs",
        verbose: true,
      });

      actions.push({
        type: "addMany",
        destination: "src/views",
        base: "templates/page/src/views",
        templateFiles: "**",
        globOptions: { dot: true },
        verbose: true,
      });

      return actions;
    },
  });
  plop.setGenerator("frontend:new:field", {
    description: "Add a new field onto a page",
    prompts: [
      {
        type: "input",
        name: "fieldName",
        message: "What is the name of the new field",
      },
      {
        type: "input",
        name: "page",
        message: "What page should this field be added to?",
      },
    ],
  });

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
