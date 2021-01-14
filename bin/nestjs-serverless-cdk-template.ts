#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NestjsServerlessCdkStack } from '../lib/nestjs-serverless-cdk-construct-template';

const app = new cdk.App();
new NestjsServerlessCdkStack(app, 'NestjsServerlessCdkTemplateStack');
