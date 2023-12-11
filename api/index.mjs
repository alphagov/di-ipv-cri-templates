import path from "path";

export default async function (plop) {
  plop.setGenerator("api:init", {
    prompts: [],
    actions: function (data) {
      data.criName = path.basename(plop.getDestBasePath());
      data.criNameShort = data.criName.replace(/^ipv-cri-/, "");

      return [
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
          templateFile: "templates/deploy.sh.hbs",
          verbose: true,
          force: true,
        },
      ];
    },
  });
}
