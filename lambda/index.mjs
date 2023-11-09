import * as path from "path";

const workflowActions = [
  {
    type: "addMany",
    destination: "./.github/workflows",
    base: "templates/workflows",
    templateFiles: "**",
    skipIfExists: true,
    verbose: true,
  },
];

const configActions = [
  {
    type: "addMany",
    destination: "./",
    base: "templates/config",
    templateFiles: "**",
    globOptions: { dot: true },
    verbose: true,
    skipIfExists: true,
  },
];

export default async function (plop) {
  plop.setGenerator("lambda:config", {
    description: "General configuration for lambda repos",
    prompts: [
      {
        type: "checkbox",
        name: "initOptions",
        message: "What would you like to initialise?",
        choices: [
          { name: "config", value: "config" },
          { name: "workflows", value: "workflows" },
        ],
      },
    ],
    actions: function (data) {
      data.criName = path.basename(plop.getDestBasePath());
      const actions = [];

      if (data.initOptions.includes("workflows")) {
        actions.push(...workflowActions);
      }

      if (data.initOptions.includes("config")) {
        actions.push(...configActions);
      }

      return actions;
    },
  });

  plop.setGenerator("lambda:new", {
    description: "Add a new lambda to a repo and initialise config",
    prompts: [
      {
        type: "input",
        name: "lambdaName",
        message: "Name of Lambda?",
      },
    ],
    actions: function (data) {
      data.criName = path.basename(plop.getDestBasePath());

      return [
        ...workflowActions,
        ...configActions,
        {
          type: "addMany",
          destination: "./lambdas/{{ kebabCase lambdaName }}",
          base: "templates/lambdas",
          templateFiles: "**/**",
          globOptions: { dot: true },
          verbose: true,
          force: true,
        },
        {
          type: "add",
          skipIfExists: true,
          path: "./infrastructure/template.yaml",
          templateFile: "./templates/infrastructure/template.hbs",
          verbose: true,
        },
        {
          type: "append",
          path: "./infrastructure/template.yaml",
          pattern: /(Resources:)/,
          templateFile: "./templates/infrastructure/resource-fragment.hbs",
        },
        {
          type: "append",
          path: "./infrastructure/template.yaml",
          pattern: /(Outputs:)/,
          templateFile: "./templates/infrastructure/output-fragment.hbs",
        },
      ];
    },
  });
}
