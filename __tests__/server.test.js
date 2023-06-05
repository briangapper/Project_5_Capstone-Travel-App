// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************

// 1.1) supertest: used for jest testing units
const request = require('supertest');

// 1.2) node-fetch: used to simulate fetches
const fetch = require('node-fetch');
jest.mock('node-fetch');

// 1.3) Import of the express server instance
const serverModule = require('../src/server/server.js');
const app = serverModule.app;
const server = serverModule.server;

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) JEST TESTS
// --------------------------------------------------------------------------------
// ********************************************************************************
describe('Express server', () => {

    // ----------------------------------------
    // 1.0) Close server after all tests are done
    // ----------------------------------------
    afterAll(() => {
        server.close();
    });

    // ----------------------------------------
    // 1.1) Test '/geoNames' route: returns data from the GeoNames API
    // ----------------------------------------
    test('/geoNames route should return data from the GeoNames API', async () => {
        
        const destination = 'New York';
        const expectedResponse = {
            lat: '40.7128',
            lng: '-74.0060',
            city: 'New York',
            country: 'United States'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                geonames: [
                    {
                        lat: '40.7128',
                        lng: '-74.0060',
                        name: 'New York',
                        countryName: 'United States'
                    }
                ]
            })
        });

        // Make the request to the /geoNames route
        const response = await request(app).get('/geoNames').query({destination});

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });

    // ----------------------------------------
    // 1.2) Test '/weatherbit' route: returns data from the Weatherbit API
    // ----------------------------------------
    test('/weatherbit route should return data from the Weatherbit API', async () => {
        
        const lat = '40.7128';
        const lng = '-74.0060';
        const departure = '0';

        const expectedResponse = {
            max_temp: '23.9',
            min_temp: '21.2',
            weather_description: 'Overcast clouds'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                data: [
                    {
                        max_temp: '23.9',
                        min_temp: '21.2',
                        weather: {
                            description: 'Overcast clouds'
                        }
                    }
                ]
            })
        });

        // Make the request to the /weatherbit route
        const response = await request(app).get('/weatherbit').query({lat, lng, departure});

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });

    // ----------------------------------------
    // 1.3) Test '/pixabay' route: returns data from the Pixabay API
    // ----------------------------------------
    test('/pixabay route should return data from the Pixabay API', async () => {
        
        const city = 'New York';
        const expectedResponse = {
            destination: city,
            imageURL: 'https://pixabay.com/get/g3d869c0f5e8330a54b13cb397aae7d5b1a57c8b226ddaa82cc7bd17fe043eab2870a33ed02b03170b1850758141c25e9dab42d4b5789a66979321b22f6946bf8_1920.jpg'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                hits: [
                    {
                        destination: 'New York',
                        fullHDURL: 'https://pixabay.com/get/g3d869c0f5e8330a54b13cb397aae7d5b1a57c8b226ddaa82cc7bd17fe043eab2870a33ed02b03170b1850758141c25e9dab42d4b5789a66979321b22f6946bf8_1920.jpg'
                    }
                ]
            })
        });

        // Make the request to the /weatherbit route
        const response = await request(app).get('/pixabay').query({city});

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
});