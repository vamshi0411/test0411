# Welcome to your nestjs serverless CDK project!

This is a blank project for serverless TypeScript development using the Nestjs framework with CDK.

## Project structure

A nestjs serverless CDK project consists of two or more separate node applications. The package.json in the root
of the project belongs to the CDK project, this controls the infrastructure used in the serverless microservice. 
The serverless application code is contained in a directory within the CDK project. The nestjs serverless CDK 
template comes with an example API that can be used for reference to develop your service, then safetly deleted.

### folders

- `/`: the files and folders (with the exception of the api folder) contained in the root of the project define infrastructure.
- `bin/`: the entrypoint to the CDK application is defined here. Do not modify the file here.
- `lib/`: the stacks that the CDK application is comprised of are defined here. Define your infrastructure here.
- `lib/ammwell/`: contains the level 3 constructs that should be used for defining infrastructure. TODO: use npm
- `example-api/`: an example API built using nestjs. This folder should be treated as the root of the API application.
- `test/`: infrastructure tests are defined here.

### files

- `cdk.json`: tells the CDK Toolkit how to execute your app.
- `gitlab-ci.yml`: CI/CD is defined here.


## Getting started

### prerequisites

- nodejs is installed.
- aws cli is installed. (see https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- aws cli is configured with your AWS credentials. (`aws configure`  once aws cli is installed)
- aws cdk is installed (`npm install -g aws-cdk`)
- CDK Toolkit is deployed into the AWS region you plan to use (`cdk bootstrap`)


### steps

1) bootstrap the nestjs project in the root of the template (`nest new <apiName> --skip-git`)

2) add controller(s) (`nest generate controller <controllerName>`). NOTE: must be in the folder created by step 1.

3) implement endpoint(s)

4) define infrastructure

5) update gitlab-ci.yml

6) deploy

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
