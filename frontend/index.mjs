export default async function (plop) {
  plop.setGenerator("frontend:new:page", {
    description: "Add a new page",
    prompts: [
      {
        type: "input",
        name: "mainRoute",
        message: "What is the URL path for the main route? (without a / prefix)",
      },
      {
        type: "input",
        name: "pageName",
        message: "What is the name of the new page"
      },
      {
        "type": "input",
        name: "pageBefore",
        message: "What step should this come before?"
      },
      {
        type: "input",
        name: "hasController",
        message: "Does this step have a controller?"},
    ]
  });
  plop.setGenerator("frontend:new:field", {
    description: "Add a new field onto a page",
    prompts: [
      {
        type: "input",
        name: "fieldName",
        message: "What is the name of the new field"
      },
      {
        "type": "input",
        name: "page",
        message: "What page should this field be added to?"
      }
    ]
  });

  plop.setGenerator("frontend:init:express", {
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
      // {
      //   type: "number",
      //   name: "portSuffix",
      //   message: "Port suffixes for Express and Imposter servers"
      // }
      {
        type: "checkbox",
        name: "initOptions",
        message: "What would you like to initialise?",
        choices: [
          { name: ".dotfiles", value: "dotfiles" },
          { name: "npm", value: "npm" },
          { name: "Express Webserver", value: "src" },
          { name: "Imposter", value: "imposter" },
          { name: "Cucumber", value: "cucumber"}
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
          templateFiles: ".*",
          globOptions: { dot: true },
          verbose: true,
        });
      }

      if(data.initOptions.includes("npm")) {
        actions.push(
          {
            type: "add",
            path: "package.json",
            templateFile: "templates/package.json.hbs",
            verbose: true,
            skipIfExists: true,
          },
        )
      }

      if (data.initOptions.includes("src")) {
        actions.push({
          type: "addMany",
          destination: "src",
          base: "templates/express/src",
          templateFiles: "**",
          globOptions: { dot: true },
          verbose: true,
        });
      }

      if(data.initOptions.includes("imposter")) {
      actions.push({
        type: "addMany",
        destination: "tests/imposter",
        base: "templates/tests/imposter",
        templateFiles: "**/*",
        globOptions: { dot: true },
        verbose: true,
      });
      }

      if(data.initOptions.includes("cucumber")) {
        actions.push({
          type: "addMany",
          destination: "tests/browser",
          base: "templates/cucumber/tests/browser",
          templateFiles: "**/*",
          globOptions: { dot: true },
          verbose: true,
        });
      }
    //
    //   if (data.initOptions.includes("docs")) {
    //     actions.push({
    //       type: "add",
    //       path: "CODEOWNERS",
    //       templateFile: "templates/CODEOWNERS",
    //       verbose: true,
    //     });
    //     actions.push({
    //       type: "add",
    //       path: "LICENSE",
    //       templateFile: "templates/LICENSE",
    //       verbose: true,
    //     });
    //     actions.push({
    //       type: "add",
    //       path: "SECURITY.md",
    //       templateFile: "templates/SECURITY.md",
    //       verbose: true,
    //     });
    //   }
    //

      return actions;
    },
  });
}
