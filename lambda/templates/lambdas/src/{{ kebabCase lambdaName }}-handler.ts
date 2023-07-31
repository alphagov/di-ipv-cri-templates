import { APIGatewayProxyResult } from "aws-lambda";
import { LambdaInterface } from "@aws-lambda-powertools/commons";

export class {{ pascalCase lambdaName }}Handler implements LambdaInterface {
  public async handler(
    event: any,
    _context: unknown
  ): Promise<APIGatewayProxyResult | any> {
    return "Hello, World!";
  }
}

const handlerClass = new {{ pascalCase lambdaName }}Handler();
export const lambdaHandler = handlerClass.handler.bind(handlerClass);
