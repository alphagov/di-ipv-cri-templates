export default async function (plop) {
  plop.setGenerator("lambda:workflow:tests", {
    description: "General configuration for lambdas",
    prompts: [],
    actions: [
      {
        type: "add",
        skipIfExists: false,
        force: true,
        path: "./.github/workflows/pre-merge-run-lambda-unit-tests.yml",
        templateFile:
          "./templates/workflows/pre-merge-run-lambda-unit-tests.yml",
      },
    ],
  });

  plop.setGenerator("lambda:new", {
    description: "General configuration for lambdas",
    prompts: [
      {
        type: "input",
        name: "lambdaName",
        message: "Name of Lambda?",
      },
    ],
    actions: function (data) {
      data.criName = plop.getDestBasePath().split("/").slice(-1)[0];

      return [
        {
          type: "add",
          skipIfExists: true,
          path: "./.github/workflows/pre-merge-run-lambda-unit-tests.yml",
          templateFile:
            "./templates/workflows/pre-merge-run-lambda-unit-tests.yml",
        },
        {
          type: "addMany",
          destination: "./",
          base: "templates/config",
          templateFiles: "**",
          globOptions: { dot: true },
          verbose: true,
          skipIfExists: true,
        },
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
