export default async function (plop) {
  await plop.load("./repo/index.mjs");
  await plop.load("./lambda/index.mjs");
  await plop.load("./api/index.mjs");
  await plop.load("./frontend/index.mjs")
}
