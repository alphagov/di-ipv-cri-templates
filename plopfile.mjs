export default async function (plop) {
  await plop.load("./repo/index.mjs");
  await plop.load("./lambda/index.mjs");
}
