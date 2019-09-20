const aws = require('aws-sdk')
const ses = new aws.SES()

// AWS.config.update({region: "eu-west-1"});

const docClient = new aws.DynamoDB.DocumentClient();

const myEmail = process.env.EMAIL
const myDomain = process.env.DOMAIN

function generateResponse (code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

// function putDynamoItem(params){
//   const getPutPromise = docClient.put(params);
//   getPutPromise.then(function(err, data){
//       if(err){
//           console.log(err);
//       }else{
//           console.log('Item loaded sucessfully into dynamo table : ' + data);
//       }
//   })

// };
function generateError (code, err) {
  console.log(err)
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(err.message)
  }
}

function generateEmailParams (body) {
  const { email, name, content } = JSON.parse(body)
  console.log(body)
  if (!(email && name && content)) {
    throw new Error('Missing parameters! Make sure to add parameters \'email\', \'name\', \'content\'.')
  }


  return {
    Source: myEmail,
    Destination: { ToAddresses: [email] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Message sent from email ${email} by ${name} \nContent: ${content}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You received a message from ${myDomain}!`
      }
    }
  }
}

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body)
    const data = await ses.sendEmail(emailParams).promise()
    const Intialparams = {
      "TableName": "example-email-test",
      "Item": JSON.parse(event.body)
    }
    const dynamodata = await docClient.put(Intialparams).promise()
    return generateResponse(200, dynamodata)
    
  } catch (err) {
    return generateError(500, err)
  }
}