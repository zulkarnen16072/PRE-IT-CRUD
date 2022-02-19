require('dotenv').config();
const express = require("express");
const app = express()
const port = process.env.PORT
const host = process.env.HOST

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 

const fileUpload = require('express-fileupload')

const multer = require('multer');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(notesRoute);


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname )
  }

})


app.use(multer({storage: fileStorage}).single('image'))

const fileFilter = (req, file, cb) => {
  const condition = ['image/jpg', 'image/png', 'image/jpeg']
  
  if (condition.includes(file.mimeType)) {
    cb(null, true)
  }

  cb(null, false) 
  return cb(new TypeError('extension file salah bro'))
  
}



const upload = multer({storage: fileStorage, fileFilter})



function responseJSONSuccess(message, response, code=200, status='OK')  {

  return response
  .status(200)
  .json({
    success: {
      code,
      status,
      message,
    }
  })

}


function responseJSON(message, response, code=400, status='bad request')  {

  return response
  .status(400)
  .json({
    error: {
      code,
      status,
      message,
    }
  })

}

app.post('/uploads' ,(req, res) => {
  
  console.info(req.file)

  if (!req.file) {
    responseJSON('file requires', res);
  } else {
    responseJSONSuccess('uploaded successfully', res, 200, 'OK')
  }

})


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
})

