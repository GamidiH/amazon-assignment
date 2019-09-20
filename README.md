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
