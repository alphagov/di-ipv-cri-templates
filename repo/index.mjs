export default async function (plop) {
  plop.setGenerator("repo:init", {
    description: "Init a repo with general configuration",
    prompts: [
      {
        type: "checkbox",
        name: "initOptions",
        message: "What would you like to initialise?",
        choices: [
          { name: ".dotfiles", value: "dotfiles" },
          { name: "GitHub Workflows", value: "workflows" },
          { name: "Repo documentation", value: "docs" },
        ],
      },
      {
        when: (data) => {
          return data.initOptions.includes("docs");
        },
        type: "checkbox",
        name: "docs",
        message: "Which docs would you like to include?",
        choices: [
          { name: "CODEOWNERS", value: "CODEOWNERS" },
          { name: "license", value: "license" },
        ],
      },
    ],
    actions: function (data) {
      console.log(data);
      const actions = [];

      if (data.initOptions.includes("dotfiles")) {
        actions.push({
          type: "addMany",
          destination: "./",
          base: "templates",
          templateFiles: "**/.*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });
      }

      if (data.initOptions.includes("workflows")) {
        actions.push({
          type: "addMany",
          destination: ".github",
          base: "templates/.github",
          templateFiles: "**",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });
      }

      if (data.initOptions.includes("docs")) {
        if (data.docs.includes("CODEOWNERS")) {
          actions.push({
            type: "add",
            skipIfExists: false,
            path: "./CODEOWNERS",
            templateFile: "./templates/docs/CODEOWNERS",
            verbose: true,
          });
        }

        if (data.docs.includes("license")) {
          actions.push({
            type: "add",
            skipIfExists: false,
            path: "./LICENSE",
            templateFile: "./templates/docs/LICENSE",
            verbose: true,
          });
        }
      }

      return actions;
    },
  });
}
