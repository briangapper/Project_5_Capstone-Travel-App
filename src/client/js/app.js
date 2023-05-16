// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
import { calculateTimeDifference } from './helper.js';
import { createTripImg } from './buildHTML.js';
import { createTripInfo } from './buildHTML.js';
import { createTripButtons } from './buildHTML.js';

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) VARIABLES
// --------------------------------------------------------------------------------
// ********************************************************************************
const port = 8000;
const pathGeoNames = `http://localhost:${port}/geoNames`;
const pathWeatherbit = `http://localhost:${port}/weatherbit`
const pathPixabay = `http://localhost:${port}/pixabay`

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 2.1) async function planTrip: main function that encompasses all function calls
// --------------------------------------------------------------------------------
async function planTrip(event){

    console.log('1.) Start function planTrip');
    let weatherbitData = {};

    // prevent default 'click' behavior
    event.preventDefault();

    // retrieve 'destination' user input
    const inputDestination = document.getElementById('input-destination').value.trim();
    console.log('User destination: ', inputDestination);

    // process 'date' user input and assign returned values to variables
    const { transformedDate, dayDifference } = calculateTimeDifference();

    try {

        // Get destination coordinates
        const geoNamesData = await getLocationData(inputDestination);

        // Get weather information if departure is in less than 16 days
        if(dayDifference <= 16){ weatherbitData = await getWeatherForecast(geoNamesData, dayDifference); };

        // Get destination picture
        const pixabayData = await getDestinationPicture(inputDestination);
        
        // Create HTML trip card
        createTripCard(geoNamesData, weatherbitData, dayDifference, transformedDate, pixabayData);

    } catch (error) {
        console.log('Error function planTrip -> ', error);
    }
};

// --------------------------------------------------------------------------------
// 2.2) async function getLocationData: requests coordinates from GeoNames API
// --------------------------------------------------------------------------------
async function getLocationData(inputDestination){

    console.log('2.) Start function getLocationData');

    // fetch call
    return fetch(`${pathGeoNames}?destination=${inputDestination}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response GeoNames: ', data);
            return data;
        })
        .catch(error => {
            // Handle errors
            console.log('Error function getLocationData -> ', error);
        })
};

// --------------------------------------------------------------------------------
// 2.3) async function getWeatherForecast: requests weather forecast from Weatherbit API
// --------------------------------------------------------------------------------
async function getWeatherForecast(geoNamesData, dayDifference){

    console.log('3.) Start function getWeatherForecast');

    const lat = geoNamesData.lat;
    const lng = geoNamesData.lng;

    // fetch call
    return fetch(`${pathWeatherbit}?lat=${lat}&lng=${lng}&departure=${dayDifference}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response Weatherbit: ', data);
            return data;
        })
        .catch(error => {
            // Handle errors
            console.log('Error function getWeatherForecast -> ', error);
        })
};

// --------------------------------------------------------------------------------
// 2.4) async function getDestinationPicture: requests weather forecast from Weatherbit API
// --------------------------------------------------------------------------------
async function getDestinationPicture(inputDestination){

    console.log('4.) Start function getDestinationPicture');

    // fetch call
    return fetch(`${pathPixabay}?destination=${inputDestination}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response Pixabay: ', data);
            return data;
        })
        .catch(error => {
            // Handle errors
            console.log('Error function getDestinationPicture -> ', error);
        })
};

// --------------------------------------------------------------------------------
// 2.5) function createTripCard: create HTML trip card
// --------------------------------------------------------------------------------
function createTripCard(geoNamesData, weatherbitData, dayDifference, inputDate, pixabayData){

    console.log('5.) Start function createTripCard');

    // ----------------------------------------
    // 2.5.1) Create new trip-card
    // ----------------------------------------
    const trip_card = document.createElement('div');
    trip_card.setAttribute('class', 'trip-card');

    // ----------------------------------------
    // 2.5.2) Create trip-img
    // ----------------------------------------
    createTripImg(trip_card, geoNamesData, pixabayData);

    // ----------------------------------------
    // 2.5.3) Create trip-info
    // ----------------------------------------
    createTripInfo(trip_card, inputDate, dayDifference, geoNamesData, weatherbitData);

    // ----------------------------------------
    // 2.5.4) Create trip-buttons
    // ----------------------------------------
    createTripButtons(trip_card, geoNamesData);

    // ----------------------------------------
    // 2.5.5) Add new trip card to HTML parent div
    // ----------------------------------------
    document.getElementById('trip-cards').appendChild(trip_card);
};

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    planTrip
};
