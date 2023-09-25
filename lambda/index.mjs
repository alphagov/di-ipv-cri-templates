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
        templateFile: "./templates/workflows/pre-merge-run-lambda-unit-tests.yml"
      }
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
    actions: [
      {
        type: "add",
        skipIfExists: true,
        path: "./.github/workflows/pre-merge-run-lambda-unit-tests.yml",
        templateFile: "./templates/workflows/pre-merge-run-lambda-unit-tests.yml"
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
    ],
  });
}
