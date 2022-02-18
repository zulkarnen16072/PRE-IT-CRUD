require('dotenv').config();
const express = require("express");
const app = express()
const port = process.env.PORT
const host = process.env.HOST

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 

const multer = require('multer');
const { json } = require('express/lib/response');

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


const fileFilter = (req, file, cb) => {
  const condition = ['image/jpg', 'image/png', 'image/jpeg']
  
  if (condition.includes(file.mimeType)) {
    cb(null, true)
  }

  cb(null, false) 
  return cb(new MediaError('file tidak sesuai'))
  
}


app.use(multer({
  storage: fileStorage,
  fileFilter
}).single('image'));


app.post('/uploads', (req, res) => {
  
  const file = req.file;

  if (!file) {
    res.status(400).json({
      errro: {
        code: 400,
        status: 'bad request',
        message: 'file required'
      } 
    })
  }

  res.json({
    status: 'successfully',
    data: req.file
  }) 

}) 


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
})

