require('dotenv').config();
const express = require("express");
const app = express()
const port = process.env.PORT
const host = process.env.HOST

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 

const fileUpload = require('express-fileupload')

const multer = require('multer');

app.use(fileUpload())

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
  return cb(new TypeError('extension file salah bro'))
  
}





// const upload = multer({
//   storage: fileStorage,
//   fileFilter
// }).single('image')


// try {
//   app.use(upload)
// } catch (e) {
//   console.info(e)
// }



const resSuccess = (req, res) => {
  res.json({
    status: 'successfully',
    data: req.file
  }) 
} 


const resError = (res, err) => {
  res.status(400).json({
    error: {
      code: 400,
      status: 'bad request',
      message: err.message
    } 
  })
}



function responseJSON(message, response, code=400, status='bad request')  {

  return response
  .status(400)
  .json({
    error: {
      code,
      status: 'bad request',
      message,
    }
  })

  //response.end()

}



app.post('/uploads/test', (req, res) => {
  
  console.info(req.files)

  if (!req.files) {
    responseJSON('file requires', res);
    return;
  }

  // if (req.files) {
  //   console.info('hi')
  // } else {
  //   console.info('hmm');
  // }
  
  
    


 
  
})

  


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
})

