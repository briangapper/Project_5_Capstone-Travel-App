// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) PACKAGES
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

const fetch = require('node-fetch');

// 1.6) local function import
const mockAPIResponse = require('./test.js');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------------------------------------
// 2.2) Initiate express
// ----------------------------------------
app.use(express.static('dist/prod'));
// app.use(express.static('dist/dev'));
// app.use(express.static('src/client'));

// ----------------------------------------
// 2.3) Configure port
// ----------------------------------------
const server = app.listen(8000, function(){
    console.log('App is listening on port 8000!');
})

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) INITIATE ROUTES
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 3.1) Initiate '/' route
// ----------------------------------------
app.get('/', function(req, res){
    res.sendFile('dist/prod/index.html');
    // res.sendFile('dist/dev/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'));
})

// ----------------------------------------
// 3.2) Initiate '/test' route
// ----------------------------------------
app.get('/test', function(req, res){
    res.send(mockAPIResponse);
})

// ----------------------------------------
// 3.2) Initiate '/geoNames' route
// ----------------------------------------
app.get('/geoNames', getLocationData);

// ----------------------------------------
// 3.3) Initiate '/weatherbit' route
// ----------------------------------------
app.get('/weatherbit', getWeatherForecast);

// ----------------------------------------
// 3.4) Initiate '/pixabay' route
// ----------------------------------------
app.get('/pixabay', getDestinationPicture);

// ********************************************************************************
// --------------------------------------------------------------------------------
// 4.) INITIATE FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 4.1.a) async function getLocationData: retrieves user destination and passes it on to the getGeoNamesData function
// ----------------------------------------
async function getLocationData(req, res){

    try {

        // Get the destination value from the request object
        const destination = req.query.destination;
        console.log('Server -> getLocationData -> Destination: ', destination);

        // Pass the destination value to the getGeoNamesData function
        const result = await getGeoNamesData(destination);
        console.log('Server -> getLocationData -> GeoNames result: ', result);

        // Send the result back to the client
        res.send(result);
        
    } catch (error) {
        
        // Error handling
        console.log('Error function getLocationData: ', error);
        res.send(error);
    }
}

// ----------------------------------------
// 4.1.b) async function getGeoNamesData: makes HTTP GET request to the GeoNames API to get destination data
// ----------------------------------------
async function getGeoNamesData(destination){
    
    // URL for the HTTP GET request to the GeoNames API 
    const geoNames_baseURL = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${process.env.GEONAME_USERNAME}`;

    try {

        // Make a HTTP GET request to the GeoNames API to get further data of the destination
        const response = await fetch(geoNames_baseURL);
        const data = await response.json();

        // Check if fetch was successful
        if(data.geonames.length > 0){

            // Return the latitude, longitude and country from the response data as an object
            return {
                lat: data.geonames[0].lat,
                lng: data.geonames[0].lng,
                city: data.geonames[0].name,
                country: data.geonames[0].countryName
            };
        }

        // If fetch wasn't successful, return empty object
        return {};

    } catch (error) {

        // Error handling
        console.log('Error function getGeoNamesData: ', error);
        throw error;
    }
}

// ----------------------------------------
// 4.2.a) function getWeatherForecast: retrieves coordinates and passes them on to the getWeatherbitData function
// ----------------------------------------
async function getWeatherForecast(req, res){

    try {

        // Get lat, lng and days until departure values from the request object
        const lat = req.query.lat;
        const lng = req.query.lng;
        const departure = req.query.departure;
        const days = parseInt(departure);
        console.log(`Server -> getWeatherForecast -> Lat: ${lat}, Lng: ${lng}, Days: ${days}`);

        // Pass the coordinates to the getWeatherbitData function
        const result = await getWeatherbitData(lat, lng, days);
        console.log('Server -> getWeatherForecast -> Weatherbit result: ', result);

        // Send the result back to the client
        res.send(result);

    } catch (error) {

        // Error handling
        console.log('Error function getWeatherForecast: ', error);
        res.send(error);
    }
}

// ----------------------------------------
// 4.2.b) function getWeatherbitData: makes HTTP GET request to the Weatherbit API to get weather forecast 
// ----------------------------------------
async function getWeatherbitData(lat, lng, days){

    // URL for the HTTP GET request to the Weatherbit API
    const weatherbit_baseURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_KEY}`;

    try {

        // Make a HTTP GET request to the Weatherbit API to get the weather forecast
        const response = await fetch(weatherbit_baseURL);
        const data = await response.json();

        // Return the max temp, min temp and the weather description from the response data as an object
        return {
            max_temp: data.data[days].max_temp,
            min_temp: data.data[days].min_temp,
            weather_description: data.data[days].weather.description
        };

    } catch (error) {

        // Error handling
        console.log('Error function getWeatherForecast', error);
        throw error;
    }
}

// ----------------------------------------
// 4.3.a) function getDestinationPicture: retrieves city and passes it on to the getPixabayData function
// ----------------------------------------
async function getDestinationPicture(req, res){

    try {

        // Get the user destination from the request object
        const city = req.query.city;
        const country = req.query.country;
        console.log(`Server -> getDestinationPicture -> City: ${city}, Country: ${country}`);

        // Pass the coordinates to the getWeatherbitData function
        const result = await getPixabayData(city, country);
        console.log('Server -> getDestinationPicture -> Pixabay result: ', result);

        // Send the result back to the client
        res.send(result);

    } catch (error) {

        // Error handling
        console.log('Error function getDestinationPicture: ', error);
        res.send(error);
    }
}

// ----------------------------------------
// 4.3.b) function getPixabayData: makes HTTP GET request to the Pixabay API to get destination picture 
// ----------------------------------------
async function getPixabayData(city, country){

    // URL for the HTTP GET request to the Pixabay API
    const pixabay_baseURL = `http://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${city}&image_type=photo`;
    const pixabay_altURL = `http://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${country}&image_type=photo`;

    try {

        // Make a HTTP GET request to the Pixabay API to get an appropriate destination picture
        const response = await fetch(pixabay_baseURL);
        const data = await response.json();

        // If no appropriate picture has been found, retrieve country img 
        if(data.hits.length === 0){

            const response_alt = await fetch(pixabay_altURL);
            const data_alt = await response_alt.json();

            return {
                destination: country,
                imageURL: data_alt.hits[0].fullHDURL
            };
        }
        
        // If appropriate picture has been found, extract the imageURL from the response data
        if(data.hits.length > 0){

            return {
                destination: city,
                imageURL: data.hits[0].fullHDURL
            };
        }

    } catch (error) {

        // Error handling
        console.log('Error function getPixabayData', error);
        throw error;
    }
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 5.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
module.exports = {
    server,
    app
};