#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios');
const app = express();
var async = require('async');
var AWS = require("aws-sdk");
var randnum = require('random-number-between');
var s3 = new AWS.S3();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

var fortuneID = 0;
var itemCountTotal = 0

var getUrl = 'https://np6vlatv5h.execute-api.us-east-2.amazonaws.com/numID/fortuneid/';
var idUrl = 'https://np6vlatv5h.execute-api.us-east-2.amazonaws.com/numID/getid' + '?tablename=Fortunes';
var url = "https://np6vlatv5h.execute-api.us-east-2.amazonaws.com/numID/";
/*AWS.config.update({
  region: "us-east-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();
var svc = new AWS.DynamoDB();
var table = "Fortunes";

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
*/

app.get('/', function (req, res) {
  res.render('index', {fortune: null, error: null});
})


app.post('/', function (req, res) {
  let fortune = JSON.parse(JSON.stringify(req.body.newFortune));
  
  function promiseID () {
    return axios.get(idUrl)
    .then(response => {
      itemCountTotal += response.data.Count;
      return parseInt(response.data.Count);
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  promiseID().then(response => {
    console.log("should be number", response);
    //var getparams = getUrl + itemCountTotal;
    if (response >= 1) {
      fortuneID = response
    }
    fortuneID = fortuneID + 1;
    console.log('Fortune ID:', fortuneID);
    console.log('fortune', fortune);
    console.log(req.body);
      
    var params = {
      "fortuneID": fortuneID,
      "fortune": fortune
      };
    
    console.log("params", params);

    request({
    url: url,
    method: "POST",
    json: true,   // <--Very important!!!
    body: params
    }, function (error, response, body){
    if (error) {
      res.render('index', {fortune: null, error: "Unable to add item."});
      console.log(error);
    } else {
      if(body == undefined) {
        res.render('index', {fortune: null, error: 'Error, please try again'});
      } else {
          let fortuneText = `Fortune: ${JSON.stringify(fortune)}, added!`;
          res.render('index', {fortune: fortuneText, error: null});
      }
    }
    });  
  }).catch(error => {
    console.log(error);
  });
}); 













  /*if (itemCountTotal >= 1) {
    fortuneID = itemCountTotal
  }
  fortuneID = fortuneID + 1;
  console.log('Fortune ID:', fortuneID);
  console.log('fortune', fortune);
  console.log(req.body);
  
  var params = {
          "fortuneID": fortuneID,
          "fortune": fortune
  };
  console.log("params", params);
  
  request({
    url: url,
    method: "POST",
    json: true,   // <--Very important!!!
    body: params
  }, function (error, response, body){
    if (error) {
      res.render('index', {fortune: null, error: "Unable to add item."});
      console.log(error);
  } else {
      if(body == undefined) {
        res.render('index', {fortune: null, error: 'Error, please try again'});
      } else {
          let fortuneText = `Fortune: ${JSON.stringify(fortune)}, added!`;
          res.render('index', {fortune: fortuneText, error: null});
      }
  }
});*/




app.get('/get', function (req, res) {
    res.render('index', {fortune: null, error: null});
  })

app.post('/get', function (req, res) {
  
  let fortune = req.body.getFortune;
  var count = 0;
  

  function promiseID () {
    return axios.get(idUrl)
    .then(response => {
      console.log("should be number", response.data);
      itemCountTotal += response.data.Count;
      return parseInt(response.data.Count);
    })
    .catch(error => {
      console.log(error);
      //return Promise.reject(error);
    });
  };
 
  promiseID().then(response => {
    console.log("should be number", response);
    //var getparams = getUrl + itemCountTotal;
    if (response <= 1) {
      count = fortuneID
    } else {
        count = response;
    };
    console.log("sonsole log count", count);
    //count = count + 1
    rand = randnum(1, count, 1);
    rand = parseInt(rand);
    var getparams = (getUrl + rand)
      
    //set promise data to a variable
    function promiseFortune () {
      return axios.get(getparams)
      .then(response3 => {
        console.log("should be fortune", response3.data);
        return response3.data.fortune.fortune;
      })
      .catch(error => {
        console.log(error);
        //return Promise.reject(error);
      });
    }
    console.log(getparams);
    promiseFortune().then(response2 => {
      console.log("should be fortune", response2);
      let fortuneText = `Fortune: ${response2}!`;
      res.render('index', {fortune: fortuneText, error: null});
    }); 
  });
});

//images and other things
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





const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Sever console log.")
});
