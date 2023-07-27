export default async function (plop) {
  plop.setGenerator("dotfiles", {
    description: "General configuration through .dotfiles",
    prompts: [],
    actions: [
      {
        type: "addMany",
        destination: "./",
        base: "templates",
        templateFiles: "**/.*",
        globOptions: { dot: true },
        verbose: true,
      },
    ],
  });

  plop.setGenerator("github", {
    description: "General configuration through .dotfiles",
    prompts: [],
    actions: [
      {
        type: "addMany",
        destination: ".github",
        base: "templates/.github",
        templateFiles: "**",
        globOptions: { dot: true },
        verbose: true,
      },
    ],
  });

  plop.setGenerator("docs", {
    description: "",
    prompts: [],
    actions: [
      {
        type: "add",
        path: "CODEOWNERS",
        templateFile: "templates/CODEOWNERS",
        verbose: true,
      },
      {
        type: "add",
        path: "LICENSE",
        templateFile: "templates/LICENSE",
        verbose: true,
      },
      {
        type: "add",
        path: "SECURITY.md",
        templateFile: "templates/SECURITY.md",
        verbose: true,
      },
    ],
  });
}
