// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');


// Start up an instance of app
const app=express();


/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
app.listen(port,listening);


// Callback to debug
function listening(){
    console.log(`Server is listening in port ${port}`);
}


// Callback function to complete GET '/all'
app.get('/all',getAllData);


function getAllData(req,res){
    res.send(projectData);
}


// Post Route
app.post('/postCall',savePostedData);


function savePostedData(req,res){
    projectData=req.body;
}