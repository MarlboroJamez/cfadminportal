require('dotenv').config();
const express = require('express');
const fs = require("fs");
const app = express();
const port = 1000;
const cors = require('cors');
const path = require('path')
const download = require("downloadjs");
const veriData = require('./data/verifications.json')
const WhiteList = require('./data/whitelist.json');
const cipcs = require('./data/cipc.json');
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: 'af-south-1'
});

let result = [];
app.use(express.json())
app.use(cors({
  origin: '*'
}));

if(result.length > 0){
  var data = JSON.stringify(result);
  fs.writeFileSync('./data/cipc.json', data);
}

app.get('/cipcs', (req, res) => {
    res.json({
      result: cipcs,
      verifications: veriData
    })
  });

  app.get('/get/cipc/report/:filename', function(req, res) {
    const fileName = req.params.filename;
    const bucketName = 'cfcipcportal';
  
    const params = {
      Bucket: bucketName,
      Key: fileName // Remove the leading slash to search in the root directory
    };
  console.log('trying to download the files')
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err);
        if (err.code === 'NoSuchKey') {
          return res.status(404).send('File not found'); // Return a 404 response if the file is not found
        } else {
          return res.status(500).send(err);
        }
      }
  
      res.attachment(fileName); // Set the filename for the downloaded file
      res.contentType('application/pdf');
      res.send(data.Body);
    });
  });
  


app.post('/login', function(req, res){
    const {email} = req.body;

    console.log(WhiteList)

    if (WhiteList.filter(e => e.email === email).length > 0) {
      const jwtToken = jwt.sign({
        email: email,
      },process.env.JWT_SECRET)

      console.log(jwtToken)
      console.log(email)
      res.json({
        token: jwtToken
      })
    }
})

if (process.env.NODE_ENV ===  "production"){
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build","index.html"));
  })
} else {
  app.get("/",(req, res) => {
    res.send("API is running...");
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})