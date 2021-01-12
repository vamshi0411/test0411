import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as NestjsServerlessCdkTemplate from '../lib/nestjs-serverless-cdk-template-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NestjsServerlessCdkTemplate.NestjsServerlessCdkTemplateStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
