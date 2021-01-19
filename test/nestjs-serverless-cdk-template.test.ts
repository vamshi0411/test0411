import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { NestjsServerlessCdkStack } from '../lib/nestjs-serverless-cdk-construct-template';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NestjsServerlessCdkStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
