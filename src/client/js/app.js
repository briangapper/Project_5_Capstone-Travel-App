// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
import { checkUserInput } from './helper.js';
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
const pathWeatherbit = `http://localhost:${port}/weatherbit`;
const pathPixabay = `http://localhost:${port}/pixabay`;

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

    // prevent default behavior
    event.preventDefault();

    // declare variables
    let geoNamesData = {};
    let pixabayData = {};
    let weatherbitData = {};
    let dayDifference = '';
    let tripDuration = '';

    // retrieve user inputs
    let destination = document.getElementById('input-destination').value.trim().replace(/ /g, '-');
    let startDate = document.getElementById('input-start-date').value;
    let endDate = document.getElementById('input-end-date').value;

    console.log(`Destination: ${destination}, Departing: ${startDate}, Returning: ${endDate}`);

    try {

        // check if user has entered valid inputs
        checkUserInput(destination, startDate, endDate);

        // perform date calculations and assign results to variables
        const dateObject = calculateTimeDifference(startDate, endDate);

        startDate = dateObject.transformed_startDate;
        endDate = dateObject.transformed_endDate;
        dayDifference = dateObject.dayDifference;
        tripDuration = dateObject.tripDuration;

        console.log(`Start date: ${startDate}, End date: ${endDate}, Days until departure: ${dayDifference}, Trip duration: ${tripDuration}`);

        // Get destination coordinates
        geoNamesData = await getLocationData(destination);

        // Get weather information if departure is in less than 16 days
        if(dayDifference < 16){
            weatherbitData = await getWeatherForecast(geoNamesData, dayDifference);
        };

        // Get destination picture
        pixabayData = await getDestinationPicture(destination);

        // Check if the maximum trip-card limit is reached, if so, delete oldest trip-card
        checkTripCardLimit(5);
        
        // Create HTML trip-card
        createTripCard(geoNamesData, weatherbitData, pixabayData, startDate, endDate, dayDifference, tripDuration);

    } catch (error) {
        console.log('Error function planTrip -> ', error);
        return;
    }
}

// --------------------------------------------------------------------------------
// 2.2) async function getLocationData: requests coordinates from GeoNames API
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
}

// --------------------------------------------------------------------------------
// 2.4) async function getDestinationPicture: requests weather forecast from Weatherbit API
// --------------------------------------------------------------------------------
async function getDestinationPicture(destination){

    console.log('4.) Start function getDestinationPicture');

    // fetch call
    return fetch(`${pathPixabay}?destination=${destination}`)
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
function createTripCard(geoNamesData, weatherbitData, pixabayData, startDate, endDate, dayDifference, tripDuration){

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
    // ---------------------------------------
    setTimeout(function(){
        
        createTripButtons(trip_card, geoNamesData);
        
        // 2.6.4.1 Add event listener to the 'remove'-button
        let removeButton = document.getElementById('remove-trip');
        
        removeButton.addEventListener('click', function(){
            let buttonsDiv = removeButton.parentNode;
            let tripCard = buttonsDiv.parentNode;
            tripCard.remove();
        });
    }, 0);

    // ----------------------------------------
    // 2.6.5) Add new trip card to HTML parent div
    // ----------------------------------------
    document.getElementById('trip-cards').prepend(trip_card);
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    planTrip
}
