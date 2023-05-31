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

// 1.6) supertest: used for jest testing units
const supertest = require('supertest');

// 1.7) node-fetch: used to make an API fetch
// const fetch = require('node-fetch');
// jest.mock('node-fetch');


// 1.8) Local imports
const serverModule = require('../src/server/server.js');
const express_server = serverModule.server;
const getLocationData = serverModule.getLocationData;
const request = supertest(express_server);

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
app.use(express.static('dist/dev'));

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) JEST TESTS
// --------------------------------------------------------------------------------
// ********************************************************************************
describe('Express server', () => {

    let jest_server;

    // ----------------------------------------
    // 3.1) Start the jest server before the tests and initiate routes
    // ----------------------------------------
    beforeAll((done) => {

        // Server listens to port 3000
        jest_server = app.listen(3000, () => {
            console.log('App is listening on port 3000!');
            done();
        });

        // Initiate '/' route
        app.get('/', function(req, res){
            res.sendFile('dist/dev/index.html');
        });

        // Initiate '/geoNames' route
        app.get('/geoNames', getLocationData);

    });

    // ----------------------------------------
    // 3.2) Close the jest server after all tests have finished
    // ----------------------------------------
    afterAll((done) => {
        jest_server.close(done);
        express_server.close();
    });

    // ----------------------------------------
    // 3.3) Test '/' route: returns index.html file
    // ----------------------------------------
    test('Route "/" should return the index.html file', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/html');
    });

    // ----------------------------------------
    // 3.3) Test '/geoNames' route: returns data from the GeoNames API
    // ----------------------------------------
    test('Route "/geoNames" should return data from the GeoNames API', async () => {

        // Mock the response from the GeoNames API
        const mockResponse = {
            geoNames: [
                {
                    lat: '51.5074',
                    lng: '-0.1278',
                    name: 'London',
                    countryName: 'United Kingdom',
                },
            ],
        };

        // Mock the fetch function to return the mockResponse
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        });
        
        // Mock the request and response objects
        const req = {query: {destination: 'London'}};

        // Make a request to the route
        const response = await request.get('/geoNames').query(req.query);

        // Verify that the fetch function was called with the correct URL
        expect(global.fetch).toHaveBeenCalledWith(
            `http://api.geonames.org/searchJSON?q=London&maxRows=1&username=${process.env.GEONAME_USERNAME}`
        );

        // Verify the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            lat: '51.5074',
            lng: '-0.1278',
            city: 'London',
            country: 'United Kingdom',
        });
    });

});










