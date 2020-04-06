var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Fortunes into DynamoDB. Please wait.");

var allFortunes = JSON.parse(fs.readFileSync('Fortunesdata.json', 'utf8'));
allFortunes.forEach(function(Fortune) {
    var params = {
        TableName: "Fortunes",
        Item: {
            "fortuneID": Fortunes.fortuneID,
            "fortune": Fortunes.fortune,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add Fortune", Fortunes.Fortune, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", Fortunes.Fortune);
       }
    });
});
