import apigw = require('@aws-cdk/aws-apigateway');
import {Construct} from '@aws-cdk/core';
import {SingleValueWidget} from '@aws-cdk/aws-cloudwatch';
import {
    AccountPrincipal,
    Effect,
    PolicyStatement,
    PolicyStatementProps, 
    PolicyDocument,
    PolicyDocumentProps
} from '@aws-cdk/aws-iam';

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

export interface LambdaApiGatewayProps {
    apiGatewayProps: apigw.LambdaRestApiProps;
    privateApi?: boolean
}

export class AmwellApiGateway extends Construct {
    public apiGateway: apigw.LambdaRestApi;
    public widget: SingleValueWidget;

    constructor(scope: Construct, id: string, props: LambdaApiGatewayProps) {
        super(scope, id);
        let amwellLambdaProps: apigw.LambdaRestApiProps = {
            binaryMediaTypes: [
                "application/json"
            ],
            cloudWatchRole: true,
            endpointTypes: props.privateApi ? [apigw.EndpointType.PRIVATE]: [apigw.EndpointType.EDGE],
            policy: props.privateApi ? new PolicyDocument({statements: [privatePolicyStatement]}): undefined,
            ...props.apiGatewayProps
        }

        this.apiGateway = new apigw.LambdaRestApi(this, id, amwellLambdaProps)
    }
}

export function addCorsOptions(apirResource: apigw.IResource) {
    apirResource.addMethod('OPTIONS', new apigw.MockIntegration({
        integrationResponses: [{
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                'method.response.header.Access-Control-Allow-Origin': "'*'",
                'method.response.header.Access-Control-Allow-Credentials': "'false'",
                'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
            }
        }],
        passthroughBehavior: apigw.PassthroughBehavior.NEVER,
        requestTemplates: {
            "application/json": "{\"statusCode\": 200}"
        }
    }), {
        methodResponses: [{
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': true,
                'method.response.header.Access-Control-Allow-Methods': true,
                'method.response.header.Access-Control-Allow-Credentials': true,
                'method.response.header.Access-Control-Allow-Origin': true,

            }
        }]
    })
}