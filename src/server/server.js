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

// ********************************************************************************
// --------------------------------------------------------------------------------
// 4.) INITIATE FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// ----------------------------------------
// 4.1) getLocationData callback function
// ----------------------------------------
async function getLocationData(req, res){

    try {

        // Information for GeoNamesAPI
        const geoName_baseURL = 'http://api.geonames.org/searchJSON?q=';
        const geoName_params = '&maxRows=1&username=';

        // Get the destination query parameter from the request object
        const destination = req.query.destination;
        console.log('Server: getLocationData -> Deatination: ', destination)

        // Make a GET request to the GeoNames API to get the data of the destination
        const response = await fetch(geoName_baseURL + destination + geoName_params + process.env.GEONAME_USERNAME);
        const data = await response.json();

        // Extract the latitude, longitude and country from the response data
        let result = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            country: data.geonames[0].countryName
        }

        console.log('Server -> GeoNames result: ', result)

        // Return result
        res.send(result)

    } catch (error) {

        console.log('Error function getLocationData', error);

    }


}