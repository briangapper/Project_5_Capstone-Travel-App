// ********************************************************************************
// --------------------------------------------------------------------------------
// 0.) IMPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
import { calculateTimeDifference } from './helper.js';

// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) VARIABLES
// --------------------------------------------------------------------------------
// ********************************************************************************
const port = 8000;
const pathGeoNames = `http://localhost:${port}/geoNames`;
const pathWeatherbit = `http://localhost:${port}/weatherbit`
const geoNamesData = {};

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

    // prevent default 'click' behavior
    event.preventDefault();

    // retrieve 'destination' user input
    const inputDestination = document.getElementById('input-destination').value.trim();
    console.log('User destination: ', inputDestination);

    // process 'date' user input and assign returned values to variables
    const { transformedDate, dayDifference } = calculateTimeDifference();

    try {

        const geoNamesData = await getLocationData(inputDestination);
        const weatherbitData = await getWeatherForecast(geoNamesData);
        createTripCard(geoNamesData, weatherbitData, dayDifference, transformedDate);

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
}

// --------------------------------------------------------------------------------
// 2.3) async function getWeatherForecast: requests weather forecast from Weatherbit API
// --------------------------------------------------------------------------------
async function getWeatherForecast(geoNamesData){

    console.log('3.) Start function getWeatherForecast');

    const lat = geoNamesData.lat;
    const lng = geoNamesData.lng;

    // fetch call
    return fetch(`${pathWeatherbit}?lat=${lat}&lng=${lng}`)
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
// 2.4) function createTripCard: create HTML trip card
// --------------------------------------------------------------------------------
function createTripCard(geoNamesData, weatherbitData, dayDifference, inputDate){

    console.log('4.) Start function createTripCard');

    const city = geoNamesData.city;
    const country = geoNamesData.country;

    const max_temp = weatherbitData.max_temp;
    const min_temp = weatherbitData.min_temp;
    const weather_description = weatherbitData.weather_description;

    // ----------------------------------------
    // 2.4.1) Create new trip-card
    // ----------------------------------------
    const trip_card = document.createElement('div');
    trip_card.setAttribute('class', 'trip-card');

    // ----------------------------------------
    // 2.4.2) Create trip-img
    // ----------------------------------------

    // create div for trip-img
    const trip_card_img = document.createElement('div');
    trip_card_img.setAttribute('class', 'trip-card-img');

    // create img
    const img = document.createElement('img');
    img.src = '../images/paris.jpg';
    img.alt = 'Paris';

    trip_card_img.appendChild(img);
    trip_card.appendChild(trip_card_img);

    // ----------------------------------------
    // 2.4.3) Create trip-info
    // ----------------------------------------

    // create div for trip-info
    const trip_card_info = document.createElement('div');
    trip_card_info.setAttribute('class', 'trip-card-info');

    // create paragraph for 'destination'-info
    const p1 = document.createElement('p');
    p1.innerHTML = 'My trip to: ';
    p1.style.fontWeight = 'bold';

    const s1 = document.createElement('span');
    s1.innerHTML = `${city}, ${country}`;
    s1.style.fontWeight= 'normal';
    
    p1.appendChild(s1);
    trip_card_info.appendChild(p1);

    // create paragraph for 'departing'-info
    const p2 = document.createElement('p');
    p2.innerHTML = 'Departing: ';
    p2.style.fontWeight = 'bold';

    const s2 = document.createElement('span');
    s2.innerHTML = inputDate;
    s2.style.fontWeight= 'normal';
    
    p2.appendChild(s2);
    trip_card_info.appendChild(p2);

    // create paragraph for 'x days away'-info
    const p3 = document.createElement('p');
    p3.innerHTML = `${city}, ${country} is `;

    const s3 = document.createElement('span');
    s3.innerHTML = `${dayDifference} days`;
    s3.style.fontWeight= 'bold';
    
    p3.appendChild(s3);
    
    p3.innerHTML += ' away!'

    trip_card_info.appendChild(p3);

    // create paragraph for 'weather'-info
    const p4 = document.createElement('p');
    p4.innerHTML = 'Typical weather ';
    p4.style.fontWeight = 'bold';

    const s4 = document.createElement('span');
    s4.innerHTML = 'for then is: ';
    s4.style.fontWeight = 'normal';
    const br1 = document.createElement('br');

    const s5 = document.createElement('span');
    s5.innerHTML = `High: ${max_temp}°C, Low: ${min_temp}°C`;
    s5.style.fontSize = '14px';
    s5.style.fontWeight = 'normal';
    const br2 = document.createElement('br');

    const s6 = document.createElement('span');
    s6.innerHTML = weather_description;
    s6.style.fontSize = '14px';
    s6.style.fontWeight = 'normal';

    p4.appendChild(s4);
    p4.appendChild(br1);
    p4.appendChild(s5);
    p4.appendChild(br2);
    p4.appendChild(s6);
    trip_card_info.appendChild(p4);
    trip_card.appendChild(trip_card_info);

    // ----------------------------------------
    // 2.4.4) Create trip-functions
    // ----------------------------------------

    // create div for trip-functions
    const trip_card_functions = document.createElement('div');
    trip_card_functions.setAttribute('class', 'trip-card-functions');

    // create button 'Add lodging info'
    const btn1 = document.createElement('button');
    btn1.setAttribute('type', 'button');
    btn1.setAttribute('id', 'add-lodging-info');
    btn1.innerHTML = 'Add lodging info';

    // create button 'Add packing list'
    const btn2 = document.createElement('button');
    btn2.setAttribute('type', 'button');
    btn2.setAttribute('id', 'add-packing-list');
    btn2.innerHTML = 'Add packing list';

    // create button 'Add notes'
    const btn3 = document.createElement('button');
    btn3.setAttribute('type', 'button');
    btn3.setAttribute('id', 'add-notes');
    btn3.innerHTML = 'Add notes';

    // create button 'Remove trip'
    const btn4 = document.createElement('button');
    btn4.setAttribute('type', 'button');
    btn4.setAttribute('id', 'remove-trip');
    btn4.innerHTML = 'Remove trip';

    // append children to parents
    trip_card_functions.appendChild(btn1);
    trip_card_functions.appendChild(btn2);
    trip_card_functions.appendChild(btn3);
    trip_card_functions.appendChild(btn4);

    trip_card.appendChild(trip_card_functions);

    // ----------------------------------------
    // 2.4.5) Add new trip card to HTML parent div
    // ----------------------------------------
    document.getElementById('trip-cards').appendChild(trip_card);
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 3.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    planTrip
}
