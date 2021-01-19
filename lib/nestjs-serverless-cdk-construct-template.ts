import * as cdk from '@aws-cdk/core';

import { 
    AmwellLambdaProperties,
    AmwellServerlessApiGatewayProperties,
    AmwellServerlessConstruct,
    AmwellServerlessConstructProperties,
 } from '@aw/aw-cdk-constructs';


 export class NestjsServerlessCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const apigwProps: AmwellServerlessApiGatewayProperties = {
            apiGatewayName: 'myExample-Api',
            publicApi: true
        };


        const lambdaProps: AmwellLambdaProperties = {
            lambdaName: 'myExample-Lambda',
            lambdaCodePath: './api/dist/bin',
            lambdaEnvVars: {
                FOO: "BAR",
                KEY: "VAL"
            }
        };

        const serverlessConstructProps: AmwellServerlessConstructProperties = {
            apiGateway: apigwProps,
            lambda: lambdaProps
        };

        const serverlessExample = new AmwellServerlessConstruct(this, 'exampleServerlessStack', serverlessConstructProps);

    }

 }