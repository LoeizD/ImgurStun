const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const imgur = require('imgur')
const bodyParser = require('body-parser');

app.use(bodyParser.raw({type: '*/*', limit: '15mb'}))

app.use(cors())

app.post('/image/', (req, res) => {
  // Upload image to CG's imgur account
  const image = req.body // binary
  fs.writeFileSync('render.png', image)

  const link = postToImgur()
  console.log(link + 'ok')
  
  // Return the image's url
  res.json(`link: ${link}`)
})

app.listen(6699, function () {
  console.log('CORS-enabled web server listening on port 6699')
})

async function postToImgur() {
  imgur.setClientId('5cae520c0678db9')
  imgur.setAPIUrl('https://api.imgur.com/3/')
  let link = 'error'

  
  let promise = new Promise((resolve, reject) => {
    // postToImgur((link) => {resolve(link)})
    imgur.uploadFile('render.png'/*image*/)
      .then(function (json) {
          link = json.data.link
          console.log(json.data.link)
          // finished(link)
          resolve(link)
      })
      .catch(function (err) {
          console.error(err.message)
      })
    });
  
    link = await promise
    return link
}