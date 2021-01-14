import * as cdk from '@aws-cdk/core';

import { 
    AmwellApiGatewayProperties,
    AmwellLambdaProperties,
    AmwellServerlessConstruct,
    AmwellServerlessConstructProperties,
 } from './amwell/amwellServerlessConstruct';


 export class NestjsServerlessCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        const apigwProps: AmwellApiGatewayProperties = {
            apiGatewayName: 'myExample-Api',
            publicApi: true
        };

        const envVars: Map<string, string> = new Map();
        envVars.set("KEY", "VALUE");
        envVars.set("FOO", "BAR");

        const lambdaProps: AmwellLambdaProperties = {
            lambdaName: 'myExample-Lambda',
            lambdaEnvVars: envVars
        };

        const serverlessConstructProps: AmwellServerlessConstructProperties = {
            apiGateway: apigwProps,
            lambda: lambdaProps
        };

        const serverlessExample = new AmwellServerlessConstruct(this, 'exampleServerlessStack', serverlessConstructProps);

    }

 }