import {Construct} from '@aws-cdk/core';

import { EndpointType, LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway';
import { Dashboard } from '@aws-cdk/aws-cloudwatch';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { AccountPrincipal, PolicyDocument, PolicyStatement } from '@aws-cdk/aws-iam';
import { AssetCode, Function, FunctionProps, Runtime } from '@aws-cdk/aws-lambda';

import { AmwellApiGateway } from './amwellApiGateway'
import { AmwellLambda } from './amwellLambda';


export interface AmwellApiGatewayProperties {
    apiGatewayName: string;
    publicApi?: boolean;
}

export interface AmwellLambdaProperties{
    lambdaName: string;
    lambdaCode: string;
    lambdaEnvVars?: Map<string, string>;
}

export interface AmwellDynamoKey {
    name: string;
    type: AttributeType
}

export interface AmwellDynamoTableProperties{
    tableName: string;
    partitionKey: AmwellDynamoKey,
    sortKey?: AmwellDynamoKey,
}

export interface AmwellServerlessCrudProperties {
    apiGateway: AmwellApiGatewayProperties;
    lambda: AmwellLambdaProperties;
    dynamoTables?: AmwellDynamoTableProperties;
}

// TODO: this needs to be an environment variable on the pipeline
const awsAccount = 250306898953;
const privatePolicyStatement: PolicyStatement = new PolicyStatement({
    principals: [new AccountPrincipal(awsAccount)],
    actions: [
        "execute-api:Invoke"
    ],
    resources: ["*"],
    sid: "example123"
})


export class AmwellServerlessCrud extends Construct {
    apiGateway: LambdaRestApi;
    lambda: Function;
    dynamoTable: Table;

    constructor(scope: Construct, id: string, props: AmwellServerlessCrudProperties) {
        super(scope, id);

        const lambdaProps: FunctionProps = {
            functionName: props.lambda.lambdaName,
            code: new AssetCode(props.lambda.lambdaCode),
            // not configurable by the developer
            handler: "src/main.handler",
            memorySize: 512,
            runtime: Runtime.NODEJS_12_X,
        }

        this.lambda = new Function(this, props.lambda.lambdaName, lambdaProps)

        // add environment variables to lambda
        if (props.lambda.lambdaEnvVars) {
            for (let entry of props.lambda.lambdaEnvVars) {
                this.lambda.addEnvironment(entry[0], entry[1])
            }
        }

        const apiGatewayProps: LambdaRestApiProps = {
            restApiName: props.apiGateway.apiGatewayName,
            handler: this.lambda,
            endpointTypes: props.apiGateway.publicApi ? [EndpointType.EDGE] : [EndpointType.PRIVATE],
            policy: props.apiGateway.publicApi ? undefined : new PolicyDocument({statements: [privatePolicyStatement]}),
            // not configurable by the developer
            binaryMediaTypes: ["appication/json"],
            cloudWatchRole: true,
        }
    }

}