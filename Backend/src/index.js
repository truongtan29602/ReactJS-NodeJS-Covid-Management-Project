require("dotenv").config();

const https = require("https");
const fs = require("fs");

// Import the express module
const express = require("express");

// Instantiate an Express application
const app = express();

// Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(4007, () => {
    console.log("serever is runing at port 4007");
  });

const port = 3007
const bodyParser = require('body-parser')

//

const routeUrl = require('../src/routes/index')

// morgan

const morgan = require('morgan');
const connectMongoDB = require("../config/connectMongoDB");


app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())




// init app

app.get('/', (req, res) => res.send("Hello"))


// connect MongoDB

connectMongoDB();

// router account service

routeUrl(app);





// Listen port
// `` : type script

app.listen(port, () => console.log(`Connect sucessfully node js with express, port default : ${port}`))

