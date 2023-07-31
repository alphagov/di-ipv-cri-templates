export default async function (plop) {
  plop.setGenerator("api:init", {
    prompts: [
      {
        type: "input",
        name: "criName",
        message: "CRI Name?",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "./infrastructure",
        base: "templates/infrastructure",
        templateFiles: "**",
        verbose: true,
        force: false,
        skipIfExists: true,
      },
      {
        type: "add",
        path: "deploy.sh",
        templateFile: "templates/deploy.sh",
        verbose: true,
        skipIfExists: true,
      },
    ],
  });
}
