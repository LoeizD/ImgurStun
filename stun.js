const express = require('express')
const app = express()
const cors = require('cors')
const fetch = require("node-fetch")
const fs = require('fs')
const imgur = require('imgur')


app.use(cors())

app.post('/image/', (req, res) => {
  // Upload image to CG's imgur account
  req.body.image

  // Return the image's url
  res.json("OK")
})

app.listen(6699, function () {
  console.log('CORS-enabled web server listening on port 6600')
})

function postToImgur() {
  console.log("hi nigg");
  
  const endpoint = 'https://api.imgur.com/3/image'
  const apiKey = '5cae520c0678db9'

  // const img = fs.readFileSync('img.png')
  const img = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  fetch(endpoint, {
    method: 'POST',
    body: `{image='${img}'}`,
    headers: { 'Authorization': `Client-ID ${apiKey}` }, })
    .then(res => res.json())
    .then(json => console.log(json));
}

function postToImgur2() {
  imgur.setClientId('5cae520c0678db9');
  imgur.setAPIUrl('https://api.imgur.com/3/');

  imgur.uploadFile('img.png')
    .then(function (json) {
        console.log(json.data.link);
    })
    .catch(function (err) {
        console.error(err.message);
    });

}

postToImgur2()