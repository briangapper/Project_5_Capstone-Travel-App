// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) PACKAGES
// --------------------------------------------------------------------------------
// ********************************************************************************

// 1.1) path: specifies the location of the module that needs to be loaded
const path = require('path');

// 1.2) express: web application framework for Node.js to build web applications and APIs
const express = require('express');

// 1.3) cors: used to protect web servers from unauthorized access, malicious attacks, and data theft
const cors = require('cors');

// 1.4) bodyparser: parses data and makes it available in req.body property
const bodyParser = require('body-parser');

// 1.5) dotenv: used to load environment variables from a .env file into the process.env object in Node.js
const dotenv = require('dotenv');
dotenv.config();

// 1.6) local function import
const mockAPIResponse = require('./test.js');

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) VARIABLES
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 1.1) 
// ----------------------------------------

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) SERVER SETUP
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 2.1) Configure app
// ----------------------------------------
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// ----------------------------------------
// 2.2) Initiate express
// ----------------------------------------
app.use(express.static('dist/dev'));
// app.use(express.static('dist/prod'));
// app.use(express.static('src/client'));

// ----------------------------------------
// 2.3) Configure port
// ----------------------------------------
app.listen(8000, function(){
    console.log('App is listening on port 8000!')
});

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) INITIATE ROUTES
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 3.1) Initiate GET '/' route
// ----------------------------------------
app.get('/', function(req, res){
    res.sendFile('dist/dev/index.html')
    // res.sendFile('dist/prod/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// ----------------------------------------
// 3.2) Initiate '/test' route
// ----------------------------------------
app.get('/test', function(req, res){
    res.send(mockAPIResponse)
});

// ----------------------------------------
// 3.2) Initiate '/geoNames' route
// ----------------------------------------
app.get('/geoNames', getLocationData);

// ----------------------------------------
// 3.3) Initiate '/weatherbit' route
// ----------------------------------------
app.get('/weatherbit', getWeatherForecast);

// ********************************************************************************
// --------------------------------------------------------------------------------
// 4.) INITIATE FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 4.1) function getLocationData: makes HTTP GET request to the GeoNames API to get further data of the user destination
// ----------------------------------------
async function getLocationData(req, res){

    // Get the destination value from the request object
    const destination = req.query.destination;
    console.log('Server -> getLocationData -> Destination: ', destination);

    // URL for the GET request to the GeoNames API 
    const geoNames_baseURL = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.GEONAME_USERNAME}`;

    try {

        // Make a GET request to the GeoNames API to get further data of the destination
        const response = await fetch(geoNames_baseURL);
        const data = await response.json();

        // Extract the latitude, longitude and country from the response data
        const result = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            city: data.geonames[0].name,
            country: data.geonames[0].countryName
        }

        console.log('Server -> getLocationData -> GeoNames result: ', result)

        // Return result
        res.send(result)

    } catch (error) {

        console.log('Error function getLocationData', error);

    }
}

// ----------------------------------------
// 4.2) function getWeatherForecast: makes HTTP GET request to the Weatherbit API to get weather forecast 
// ----------------------------------------
async function getWeatherForecast(req, res){

    // Get the lat and lng value from the request object
    const lat = req.query.lat;
    const lng = req.query.lng;

    console.log('Server -> getWeatherForecast -> Lat: ', lat);
    console.log('Server -> getWeatherForecast -> Lng: ', lng);

    // URL for the GET request to the Weatherbit API
    const weatherbit_baseURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`;

    try {

        // Make a GET request to the Weatherbit API to get the weather forecast
        const response = await fetch(weatherbit_baseURL);
        const data = await response.json();

        // Extract the max temp, min temp and the weather description from the response data
        const result = {
            max_temp: data.data[0].max_temp,
            min_temp: data.data[0].min_temp,
            weather_description: data.data[0].weather.description
        }

        console.log('Server -> getWeatherForecast -> Weatherbit result: ', result)

        // Return result
        res.send(result)

    } catch (error) {

        console.log('Error function getWeatherForecast', error);

    }
}