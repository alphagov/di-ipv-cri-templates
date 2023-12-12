import * as path from "path";

const configActions = [
  {
    type: "addMany",
    destination: "./",
    base: "templates/config",
    templateFiles: "**",
    globOptions: { dot: true },
    verbose: true,
    force: true,
  },
];

const workflowActions = [
  {
    type: "addMany",
    destination: ".github/workflows",
    base: "templates/.github/workflows",
    templateFiles: "**",
    globOptions: { dot: true },
    verbose: true,
    force: true,
  },
];

const lambdaConfigActions = [
  {
    type: "addMany",
    destination: "./lambdas/{{ kebabCase lambdaName }}",
    base: "templates/lambdas",
    templateFiles: "templates/lambdas/*",
    globOptions: { dot: true },
    verbose: true,
    force: true,
  },
];

const lambdaSourceActions = [
  {
    type: "addMany",
    destination: "./lambdas/{{ kebabCase lambdaName }}",
    base: "templates/lambdas",
    templateFiles: "templates/lambdas/**/*",
    globOptions: { globstar: false },
    verbose: true,
    force: true,
  },
];

export default async function (plop) {
  plop.setGenerator("lambda:config", {
    description: "General configuration for lambda repos",
    prompts: [],
    actions: createActions(plop, configActions),
  });

  plop.setGenerator("lambda:workflows", {
    description: "GitHub Actions workflows for lambda repos",
    prompts: [],
    actions: createActions(plop, workflowActions),
  });

  plop.setGenerator("lambda:update", {
    description: "Update config for an existing lambda and its repo",
    prompts: [
      {
        type: "input",
        name: "lambdaName",
        message: "Name of Lambda?",
      },
    ],
    actions: createActions(plop, lambdaConfigActions),
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
    actions: createActions(plop, [
      ...configActions,
      ...lambdaConfigActions,
      ...lambdaSourceActions,
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
    ]),
  });
}

const createActions = (plop, actions) =>
  function (data) {
    data.criName = path.basename(plop.getDestBasePath());
    data.criNameShort = data.criName.replace(/^ipv-cri-/, "");
    return actions;
  };
