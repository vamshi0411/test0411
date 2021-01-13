import { Dashboard } from '@aws-cdk/aws-cloudwatch';
import { AssetCode, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import {AmwellLambda} from './amwell/amwellLambda';
import {AmwellApiGateway} from './amwell/amwellApiGateway';

export class NestjsServerlessCdkTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const exampleLambda = new AmwellLambda(this, 'ExampleLambda', {
      lambdaProps: {
        functionName: "example-api-lambda",
        handler: "src/main.handler",
        runtime: Runtime.NODEJS_12_X,
        code: new AssetCode(`./example-api`),
        environment: {
          FOO: "BAR",
        }
      },
    });

    const proxyApi = new AmwellApiGateway(this, "ExampleApi", {
      apiGatewayProps: {
        restApiName: "ExampleAPI",
        handler: exampleLambda.lambda
      },
      privateApi: false
    });

    // example of adding an environment variable, post initialization
    exampleLambda.lambda.addEnvironment("STAGE", proxyApi.apiGateway.deploymentStage.toString().split(".")[1]);

    const proxyDashboard = new Dashboard(this, 'ExampleDashboard', {
      dashboardName: "ExampleAPIDashboard",
      widgets: [[exampleLambda.widget]]
    });
  }
}
