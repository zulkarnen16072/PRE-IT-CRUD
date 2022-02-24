require('dotenv').config();
const express = require("express");
const app = express()
const port = process.env.PORT
const host = process.env.HOST

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 

const multer = require('multer');
const { object } = require('joi');
const { json } = require('express');
const routeTags = require('./src/tags/tag.routes');




app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(notesRoute).use(routeTags);




const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname )
  }

})


function responseJSONSuccess(message, response, code=200, status='OK')  {

  return response
  .status(200)
  .json({
    success: {
      status,
      code,
      message
    }
  })

}


function responseJSON({message, res, status=400, error='bad request', detail=''})  {

  console.info(`Status bug ${status}`)
 
  const errorValues = Object.assign({}, 
    status ? {status}  : null,
    error ? {error}  : null,
    message ? {message}  : null,
    detail ? {detail}: null
  )


  return res.status(400).json({
    errors: errorValues
  })


  

}


const fileFilter = (req, file, cb) => {


  const condition = ['image/jpeg', 'image/png', 'image/jpeg', 'image/JPG']
  if (condition.includes(file.mimeType)) {
    cb(null, true)
  } else {
    cb(null, false) 
    cb(new RangeError('Only .png, .jpg and .jpeg format allowed!'))
  }

}

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter
}).single('image')






const up = multer({
  storage: fileStorage,

  fileFilter: (req, file, cb) => {
   
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ) {
        cb(null, true)
      } else {
        cb(null, false);
        cb(new TypeError('Only .png, .jpg and .jpeg format allowed!'));
      }      
    }

  }).single('image');





  const isNaNFile = (err, req) => {

    if (!(typeof err === 'object') && req.file === undefined) {
      return true;
    } else {
      return false;
    }

  }



app.post('/uploads', (req, res, next) => {

  up(req, res, function (err) {

    if (isNaNFile(err, req)) {
      return next()     
    }
    
    if (err instanceof multer.MulterError) {
      return responseJSON({message :'no response adalah sebuah response', res:res, detail: 'ensure you sadar diri'})
    } else if (err instanceof TypeError) {
      return responseJSON({status: 415, error: 'unsupported media type', message :'extension must be .png, jpeg, jpg', res:res, detail: err.message})
    } else if (err instanceof RangeError) {
      return responseJSON({message :err.message, res:res})      
    } else if (err) {return responseJSON({message: 'error pokokna', res})
  
  }
  
  responseJSONSuccess('berhasil hore', res)
    

  })

 

}, (req, res) => {
  res.status(400).json(responseJSON({
    status: 400,
    error: 'bad request',
    message: 'no response adalah sebuah response',
    res,
    detail: 'ensure your self-aware and have connection'
  }))
})






app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
})

