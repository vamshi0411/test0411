import {Construct, Duration} from '@aws-cdk/core';
import {SingleValueWidget} from '@aws-cdk/aws-cloudwatch';
import lambda = require('@aws-cdk/aws-lambda');
import {RetentionDays} from '@aws-cdk/aws-logs';


const METRIC_PROP_AVG = {
    statistic: 'Average'
}

const METRIC_PROP_SUM = {
    statistic: 'Sum'
}

export interface LambdaProps {
    lambdaProps: lambda.FunctionProps;
}

export class AmwellLambda extends Construct {
    public lambda: lambda.Function;
    public widget: SingleValueWidget;

    constructor(scope: Construct, id: string, props: LambdaProps) {
        super(scope, id);


        let amwellLambdaProps : lambda.FunctionProps = {
            // example: requirement that all lambdas retain logs for 18 months
            logRetention: RetentionDays.EIGHTEEN_MONTHS,
            memorySize: 128,
            timeout: Duration.seconds(10),
            ...props.lambdaProps
        }

        this.lambda = new lambda.Function(this, id, amwellLambdaProps);


        // example: requirement that all lambdas track the following metrics on a dashboard
        const invocationMetric = this.lambda.metric('Invocations', METRIC_PROP_SUM);
        const durationMetric = this.lambda.metric('Duration', METRIC_PROP_AVG);
        const errorsMetric = this.lambda.metric('Errors', METRIC_PROP_SUM)


        this.widget = new SingleValueWidget({
            metrics: [invocationMetric, durationMetric, errorsMetric],
            title: props.lambdaProps.functionName + ' Dashboard',
            setPeriodToTimeRange: true,
            height: 3,
            width: 15
        });
    }
}