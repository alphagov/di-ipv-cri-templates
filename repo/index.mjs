import path from "path";

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
          { name: "GitHub templates", value: "github" },
          { name: "Repo documentation", value: "docs" },
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
          templateFiles: "**/.*",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        });

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
        actions.push({
          type: "add",
          path: "CODEOWNERS",
          templateFile: "templates/CODEOWNERS",
          verbose: true,
          force: true,
        });
        actions.push({
          type: "add",
          path: "LICENSE",
          templateFile: "templates/LICENSE",
          verbose: true,
          force: true,
        });
        actions.push({
          type: "add",
          path: "SECURITY.md",
          templateFile: "templates/SECURITY.md",
          verbose: true,
          force: true,
        });
      }

      return actions;
    },
  });
}
