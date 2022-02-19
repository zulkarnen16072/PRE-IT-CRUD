require('dotenv').config();
const express = require("express");
const app = express()
const port = process.env.PORT
const host = process.env.HOST

const bodyParser = require('body-parser');
const notesRoute = require('./src/notes/routes'); 

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


const isFile = (file) => {
  file = {};
  if (file === undefined || file === null || file === '') {
    return false;
  } else {
    return true;
  }
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






      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg" ) {
        cb(null, true)
      } else {
        cb(null, false);
        cb(new TypeError('Only .png, .jpg and .jpeg format allowed!'));
      }      
  

  }

    
}).single('image');



app.post('/uploads/test', (req, res, next) => {

  console.info(req.body.length)

  


      
  up(req, res, function (err) {


    
      if (err instanceof multer.MulterError) {
        return responseJSON(err.message, res)
      } else if (err instanceof TypeError) {
        return responseJSON(err.message, res)
      } else if (err instanceof RangeError) {
        return responseJSON(err.message, res)      
      } else if (err) {
        return responseJSON('error pokokna', res)
      }
    
      
      responseJSONSuccess('berhasil hore', res)
  

    

  
  })
  


})



app.post('/uploads' ,(req, res) => {

  
  
  console.info(req.file)
  console.info(req.file)


  if (!req.file) {
    responseJSON('file requires', res);
  } 
  
 
    responseJSONSuccess('uploaded successfully', res, 200, 'OK')
 
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on http://${host}:${port}`)
})

