// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************

import {getLocationData} from '../src/server/server.js';

// 1.1) supertest: used for jest testing units
const request = require('supertest');

// 1.2) node-fetch: used to simulate fetches
const fetch = require('node-fetch');
jest.mock('node-fetch');

// 1.3) Import of the express server instance
const serverModule = require('../src/server/server.js');
const app = serverModule.app;
// const server = serverModule.server;

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) JEST TESTS
// --------------------------------------------------------------------------------
// ********************************************************************************
describe('Express server', () => {

    // ----------------------------------------
    // 1.1) Test '/geoNames' route: returns data from the GeoNames API
    // ----------------------------------------
    test('Route "/geoNames" should return data from the GeoNames API', async() => {

        const destination = 'London';
        
        // Make a request to the "/geoNames" route with the destination query parameter
        const response = await request(app)
            .get('/geoNames')
            .query({destination});

        // Assert the response status code
        expect(response.status).toBe(200);

          // Assert the response body or properties
        expect(response.body).toHaveProperty('lat');
        expect(response.body).toHaveProperty('lng');
        expect(response.body).toHaveProperty('city');
        expect(response.body).toHaveProperty('country');
    });

});