import { HelloWorldHandler } from "../src/hello-world-handler";
import { Context } from "aws-lambda";

describe("hello-world-handler", () => {
  it("should print Hello, World!", async () => {
    const helloWorldHandler = new HelloWorldHandler();
    const result = await helloWorldHandler.handler({}, {} as Context);
    expect(result).toStrictEqual("Hello, World!");
  });
});
