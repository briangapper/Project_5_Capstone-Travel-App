// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
import { checkUserInput } from './helper.js';
import { calculateTimeDifference } from './helper.js';
import { createTripImg } from './buildTripCard.js';
import { createTripInfo } from './buildTripCard.js';
import { createTripButtons } from './buildTripCard.js';
import { add_lodging_info_button } from './handleButtons.js';
import { add_packing_list_button } from './handleButtons.js';
import { add_notes_button } from './handleButtons.js';
import { remove_trip_button } from './handleButtons.js';

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) VARIABLES
// --------------------------------------------------------------------------------
// ********************************************************************************
const port = 8000;
const pathGeoNames = `http://localhost:${port}/geoNames`;
const pathWeatherbit = `http://localhost:${port}/weatherbit`;
const pathPixabay = `http://localhost:${port}/pixabay`;
let unique_identifier = 999;

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

    // 2.1.1) Prevent default behavior
    event.preventDefault();

    // 2.1.2) Declare variables
    let geoNamesData = {};
    let pixabayData = {};
    let weatherbitData = {};
    let dayDifference = '';
    let tripDuration = '';
    unique_identifier += 1;

    // 2.1.3) Retrieve user inputs
    let destination = document.getElementById('input-destination').value.trim().replace(/ /g, '-');
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;

    console.log(`Destination: ${destination}, Departing: ${startDate}, Returning: ${endDate}`);

    try {

        // 2.1.4) Check if user has entered valid inputs
        checkUserInput(destination, startDate, endDate);

        // 2.1.5) Perform date calculations based on user input and assign results to variables
        const dateObject = calculateTimeDifference(startDate, endDate);

        startDate = dateObject.transformed_startDate;
        endDate = dateObject.transformed_endDate;
        dayDifference = dateObject.dayDifference;
        tripDuration = dateObject.tripDuration;

        console.log(`Start date: ${startDate}, End date: ${endDate}, Days until departure: ${dayDifference}, Trip duration: ${tripDuration}`);

        // 2.1.6) API call 1: get destination coordinates
        geoNamesData = await getLocationData(destination);

        // 2.1.7) API call 2: Get weather information if departure is in less than 16 days
        if(dayDifference < 16){
            weatherbitData = await getWeatherForecast(geoNamesData, dayDifference);
        };

        // 2.1.8) API call 3: Get destination picture
        pixabayData = await getDestinationPicture(geoNamesData);

        // 2.1.9) Check if the maximum trip-card limit is reached, if so, delete oldest trip-card
        checkTripCardLimit(7);
        
        // 2.1.10) Create HTML trip-card
        createTripCard(unique_identifier, geoNamesData, weatherbitData, pixabayData, startDate, endDate, dayDifference, tripDuration);

        // 2.1.11) Implement functionalities for the different trip-card-buttons
        handleTripCardButtons(unique_identifier);

    } catch (error) {
        console.log('Error function planTrip -> ', error);
        return;
    }
}

// --------------------------------------------------------------------------------
// 2.2) async function getLocationData: API call 1 -> requests coordinates from GeoNames API
// --------------------------------------------------------------------------------
async function getLocationData(destination){

    console.log('2.) Start function getLocationData');

    // fetch call
    return fetch(`${pathGeoNames}?destination=${destination}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response GeoNames: ', data);

            // Trigger alert if fetch was not successful
            if(Object.keys(data).length === 0){
                alert('Please enter a valid destination.');
                throw new Error('Please enter a valid destination.');
            }

            return data;
        })
        .catch(error => {
            // Handle errors
            console.log('Error function getLocationData -> ', error);
        })
}

// --------------------------------------------------------------------------------
// 2.3) async function getWeatherForecast: API call 2 -> requests weather forecast from Weatherbit API
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
}

// --------------------------------------------------------------------------------
// 2.4) async function getDestinationPicture: API call 3 -> requests weather forecast from Weatherbit API
// --------------------------------------------------------------------------------
async function getDestinationPicture(geoNamesData){

    console.log('4.) Start function getDestinationPicture');

    const city = geoNamesData.city;
    const country = geoNamesData.country;

    // fetch call
    return fetch(`${pathPixabay}?city=${city}&country=${country}`)
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
}

// --------------------------------------------------------------------------------
// 2.5) function checkTripCardLimit: Check if the maximum trip-card limit is reached, if so, delete oldest trip-card
// --------------------------------------------------------------------------------
function checkTripCardLimit(limit){

    console.log('5.) Start function checkTripCardLimit');

    const tripCardsCollection = document.getElementsByClassName('trip-card');
    const tripCardsArray = Array.from(tripCardsCollection);

    if(tripCardsArray.length >= limit){

        const tripCardsContainer = document.getElementById('trip-cards');
        const lastTripCard = tripCardsContainer.lastElementChild;
        lastTripCard.remove();
    }
}

// --------------------------------------------------------------------------------
// 2.6) function createTripCard: create HTML trip card
// --------------------------------------------------------------------------------
function createTripCard(unique_identifier, geoNamesData, weatherbitData, pixabayData, startDate, endDate, dayDifference, tripDuration){

    console.log('6.) Start function createTripCard');

    // ----------------------------------------
    // 2.6.1) Create new trip-card
    // ----------------------------------------
    const trip_card = document.createElement('div');
    trip_card.setAttribute('class', 'trip-card');

    // ----------------------------------------
    // 2.6.2) Create trip-img
    // ----------------------------------------
    createTripImg(trip_card, geoNamesData, pixabayData);

    // ----------------------------------------
    // 2.6.3) Create trip-info
    // ----------------------------------------
    createTripInfo(trip_card, geoNamesData, weatherbitData, startDate, endDate, dayDifference, tripDuration);

    // ----------------------------------------
    // 2.6.4) Create trip-buttons
    // ----------------------------------------
    createTripButtons(trip_card, unique_identifier);

    // ----------------------------------------
    // 2.6.5) Add new trip card to HTML parent div
    // ----------------------------------------
    document.getElementById('trip-cards').prepend(trip_card);
}

// --------------------------------------------------------------------------------
// 2.7) function handleTripCardButtons: handle all different trip-card-buttons
// --------------------------------------------------------------------------------
function handleTripCardButtons(unique_identifier){

    console.log('7.) Start function handleTripCardButtons');
    
    // 2.7.1) Handle add-lodging-info-button
    add_lodging_info_button(unique_identifier);
    
    // 2.7.2) Handle add-packing-list-button
    add_packing_list_button(unique_identifier);
    
    // 2.7.3) Handle add-notes-button
    add_notes_button(unique_identifier);

    // 2.7.4) Handle remove-trip-button
    remove_trip_button(unique_identifier);
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    planTrip
}
