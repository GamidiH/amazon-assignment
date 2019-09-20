# amazon-assignment

assignment to send email

<!--
title: 'AWS Serverless REST API example in NodeJS'
description: 'This is a serverless SES application to send emails  '
framework: serverless
platform: AWS
language: nodeJS
authorName: 'Gamidi Harish'
-->
# Serverless Email API

This example demonstrates how to send a email to verified address. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the operations. For each operation exactly one file exists e.g. `operations/sendMessage.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

The idea behind the `operations` directory is that in case you want to create a service containing multiple resources e.g. delete, update, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: ses-contact-form-api
stage: dev
region: eu-west-1
api keys:
  None
endpoints:
  POST - https://ji626zxl1l.execute-api.eu-west-1.amazonaws.com/dev/email/send
  GET - https://ji626zxl1l.execute-api.eu-west-1.amazonaws.com/dev/email/{id}

```

## Usage

You can sendMessage and receiveMessage with the following commands:

### sendMessage Operation

```bash
curl -X POST https://ji626zxl1l.execute-api.eu-west-1.amazonaws.com/dev/email/send --data '{"email":"harish.gamidi@gmail.com","name":"Harish", "content":"Hi, Sample test."}'
```

Example Result:
```bash
    {}
```

### receiveMessage operation


```bash
# Replace the <id> part with a real id from your example table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<id>
```

Example Result:
```bash
{"email":"harish.gamidi@gmail.com","name":"Harish", "content":"hello Kumar"}%
```

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```

In case you expect a lot of traffic fluctuation we recommend to checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)