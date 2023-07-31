import { APIGatewayProxyResult } from "aws-lambda";
import { LambdaInterface } from "@aws-lambda-powertools/commons";

export class HelloWorldHandler implements LambdaInterface {
  public async handler(
    event: any,
    _context: unknown
  ): Promise<APIGatewayProxyResult | any> {
    return "Hello, World!";
  }
}

const handlerClass = new HelloWorldHandler();
export const lambdaHandler = handlerClass.handler.bind(handlerClass);
