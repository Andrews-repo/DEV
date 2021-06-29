#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

var async = require('async');
var AWS = require("aws-sdk");
var randnum = require('random-number-between');
var s3 = new AWS.S3();


AWS.config.update({
  region: "us-east-2",

});


var docClient = new AWS.DynamoDB.DocumentClient();
var svc = new AWS.DynamoDB();

var table = "Fortunes";
var fortuneID = 0;

var scanComplete = false,
    itemCountTotal = 0,
    consumedCapacityUnitsTotal = 0;

var scanParams = { TableName : table };

// scan is called iteratively until all rows have been scanned
//  this uses the asyc module to wait for each call to complete
//  before issuing the next.
async.until( function() { return scanComplete; },
             function (callback) {
                svc.scan(scanParams, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        if (typeof (result.LastEvaluatedKey) === 'undefined' ) {
                            scanComplete = true;
                        } else {
                            // set the start key for the next scan to our last key
                            scanParams.ExclusiveStartKey = result.LastEvaluatedKey;
                        }
                        itemCountTotal += result.Count;
                        consumedCapacityUnitsTotal += result.ConsumedCapacityUnits;
                        if (!scanComplete) {
                            console.log("cumulative itemCount " + itemCountTotal);
                            console.log("cumulative capacity units " + consumedCapacityUnitsTotal);
                        }
                    }
                    callback(err);
                });
             },
             // this runs when the loop is complete or returns an error
             function (err) {
                if (err) {
                    console.log('error in processing scan ');
                    console.log(err);
                } else {
                    console.log('scan complete')
                    console.log('Total items: ' + itemCountTotal);
                    console.log('Total capacity units consumed: ' + consumedCapacityUnitsTotal);
                }
             }
);


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

//fetches static page from s3 bucket
app.get('/s3page', function(req, res) {
  s3.getObject({ Bucket: "fortunesite-apcloudtech", Key: "index.html" })
 .on('httpHeaders', function (statusCode, headers) {
      res.set('Content-Length', headers['content-length']);
      res.set('Content-Type', "text/html");
      this.response.httpResponse.createUnbufferedStream()
          .pipe(res);
  })
  .send();
});

//fetches cat image page
app.get('/catimage',(req, res)=>{
  async function getImage(){
      const data =  s3.getObject(
        {
            Bucket: 'fortunesite-apcloudtech',
            Key: 'IMG_8472.jpeg'
          }
        
      ).promise();
      return data;
    };
  
  getImage().then((img)=>{
        let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "style display=block margin-left=auto margin-right=auto height=50%" + "/>";
        let startHTML="<html><body></body>";
        let endHTML="</body></html>";
        let html=startHTML + image + endHTML;
      res.send(html)
    }).catch((e)=>{
      res.send(e)
    })
  
  function encode(data){
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64
  }
})



app.get('/', function (req, res) {
  res.render('index', {fortune: null, error: null});
})

app.post('/', function (req, res) {

let fortune = req.body.newFortune;

if (itemCountTotal >= 1) {
    fortuneID = itemCountTotal
}

fortuneID = fortuneID + 1;
console.log('Fortune ID:', fortuneID);
    
var params = {
    TableName:table,
    Item:{
        "fortuneID": fortuneID,
        "fortune": fortune
    }
};

  docClient.put(params, function(err, data) {
    if (err) {
        res.render('index', {fortune: null, error: "Unable to add item."});
    } else {
        if(params == undefined) {
           res.render('index', {fortune: null, error: 'Error, please try again'});
        } else {
            let fortuneText = `Fortune: ${params.Item.fortune}, added!`;
            res.render('index', {fortune: fortuneText, error: null});
        }
    }
  });

})

app.get('/get', function (req, res) {
    res.render('index', {fortune: null, error: null});
  })

app.post('/get', function (req, res) {
  
  let fortune = req.body.getFortune;

  var count = 0;

  if (itemCountTotal <= 1) {
    count = fortuneID
  } else {
      count = itemCountTotal
  }

  count = count + 1
  rand = randnum(1, count, 1);
  rand = parseInt(rand);
      
  var getparams = {
      TableName:table,
      Key:{
          "fortuneID": rand
      }
  };

  if (count <= 1) {
    res.render('index', {fortune: null, error: 'Error, please enter a fortune first'});
  } else {
      docClient.get(getparams, function(err, data) {
        if (err) {
            res.render('index', {fortune: null, error: "Unable to get item."});
        } else {
            if(getparams == undefined) {
                res.render('index', {fortune: null, error: 'Error, please try again'});
            } else {
                let fortuneText = `Fortune: ${data.Item.fortune}!`;
                res.render('index', {fortune: fortuneText, error: null});
            }
        }
      });
  }
  
})




const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Sever console log.")
});
