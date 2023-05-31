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
    // 1.1) Test '/' route: returns index.html file
    // ----------------------------------------
    test('Route "/" should return the index.html file', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('text/html');
        server.close();
    });

    // ----------------------------------------
    // 1.2) Test '/geoNames' route: returns data from the GeoNames API
    // ----------------------------------------
    test('Route "/geoNames" should return data from the GeoNames API', async() => {
        
        const response = await request(app).get('/geoNames?destination=London');
        // const response = await fetch('http://localhost:8000/geoNames?destination=London');
        const data = response.body;
        console.log(`Response GeoNames: ${data}`);
        expect(data).toHaveProperty('lat');

    });


});