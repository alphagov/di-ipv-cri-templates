import { {{ pascalCase lambdaName }}Handler } from "../src/{{ kebabCase lambdaName }}-handler";
import { Context } from "aws-lambda";

describe("{{ kebabCase lambdaName }}-handler", () => {
  it("should print Hello, World!", async () => {
    const {{ camelCase lambdaName }}Handler = new {{ pascalCase lambdaName }}Handler();
    const result = await {{ camelCase lambdaName }}Handler.handler({}, {} as Context);
    expect(result).toStrictEqual("Hello, World!");
  });
});
