export default async function (plop) {
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
        type: "addMany",
        destination: "./lambdas/{{ kebabCase lambdaName }}",
        base: "templates/lambdas",
        templateFiles: "**/**",
        globOptions: { dot: true },
        verbose: true,
        force: true,
      },
      {
        type: "addMany",
        destination: "./infrastructure",
        base: "templates/infrastructure",
        templateFiles: "**",
        verbose: true,
        force: false,
        skipIfExists: true
      },
      {
        type: "append",
        path: "./infrastructure/template.yaml",
        pattern: /(Resources:)/,
        templateFile: "./templates/hbs-files/lambda-resource.hbs",
      },
      {
        type: "append",
        path: "./infrastructure/template.yaml",
        pattern: /(Outputs:)/,
        templateFile: "./templates/hbs-files/lambda-outputs.hbs",
      },
    ],
  });
}
