/* Global Variables */
//added countryCode variable, this code will be used with zip to fetch the data from api
const countryCode='IN';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const key='cfd871c1005ee4eb7b0b71893d390d39';
const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',getWeatherData);


/* Function called by event listener */
function getWeatherData(){
    let zipCode=document.getElementById('zip').value;
    let feelings=document.getElementById('feelings').value;
    getWeatherAPICall(baseURL,zipCode,key).then(function(weatherData){
        postData('/postCall',{
            temperature:weatherData.main.temp,
            date:newDate,
            userResponse:feelings
        });
    }).then(function(){
        updateUI()
    })
}


/* Function to GET Web API Data*/
const getWeatherAPICall= async (url,zip,key)=>{
     const response=await fetch(`${url}${zip},${countryCode}&appid=${key}`);
     try{
         const weatherData=await response.json();
         return weatherData;
     }catch(error){
         console.log('error',error);
     }
}


/* Function to POST data */
const postData=async (url='',data={})=>{
    const response= await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    try{
        const newData= await response.json();
    }catch(error){
        console.log('error',error);
    }
}

 
/* Function to GET Project Data and update the UI */
const updateUI=async()=>{
    const response=await fetch('/all');
    try{
    const dataFromServer=await response.json();
    document.getElementById('date').innerHTML=`Date: ${dataFromServer.date}`;
    document.getElementById('temp').innerHTML=`Temperature in kelvin: ${dataFromServer.temperature}`;
    document.getElementById('content').innerHTML=`User Feeling: ${dataFromServer.userResponse}`;
    }catch(error){
        console.log('error',error);
    }
}