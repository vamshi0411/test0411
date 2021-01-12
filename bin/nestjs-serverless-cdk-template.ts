#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NestjsServerlessCdkTemplateStack } from '../lib/nestjs-serverless-cdk-template-stack';

const app = new cdk.App();
new NestjsServerlessCdkTemplateStack(app, 'NestjsServerlessCdkTemplateStack');
