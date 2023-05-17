// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function createTripImg: creates trip img for card
// --------------------------------------------------------------------------------
function createTripImg(trip_card, geoNamesData, pixabayData){

    console.log('6.1) create trip-img');

    // retrieve object values
    const img_path = pixabayData.imageURL;
    const city = geoNamesData.city;

    // create div for trip-img
    const trip_card_img = document.createElement('div');
    trip_card_img.setAttribute('class', 'trip-card-img');

    // create img
    const img = document.createElement('img');
    img.src = img_path;
    img.alt = city;

    // append img to trip_card
    trip_card_img.appendChild(img);
    trip_card.appendChild(trip_card_img);
};

// --------------------------------------------------------------------------------
// 1.2) function createTripInfo: creates trip information for card
// --------------------------------------------------------------------------------
function createTripInfo(trip_card, geoNamesData, weatherbitData, startDate, endDate, dayDifference, tripDuration){

    console.log('6.2) create trip-info');

    // create div for trip-info
    const trip_card_info = document.createElement('div');
    trip_card_info.setAttribute('class', 'trip-card-info');
    
    // 1.2.1) creates paragraph for 'destination'-info
    createTripInfo_Destination(trip_card_info, geoNamesData);

    // 1.2.2) creates paragraph for 'departing'-info
    createTripInfo_Departing(trip_card_info, startDate);

    // 1.2.3) creates paragraph for 'returning'-info if end-date has been given
    if(endDate !== 0){
        createTripInfo_Returning(trip_card_info, endDate);
    }

    // 1.2.4) creates paragraph for 'trip duration'-info if end-date has been given
    if(endDate !== 0){
        createTripInfo_TripDuration(trip_card_info, tripDuration);
    }

    // 1.2.5) creates paragraph for 'x days away'-info
    createTripInfo_XDaysAway(trip_card_info, dayDifference, geoNamesData);

    // 1.2.6) creates paragraph for 'weather'-info if departure is in less then 16 days
    if(Object.keys(weatherbitData).length > 0){
        createTripInfo_Weather(trip_card_info, weatherbitData);
    }
    
    // append info to trip_card
    trip_card.appendChild(trip_card_info);
};

// --------------------------------------------------------------------------------
// 1.2.1) function createTripInfo_Destination: creates paragraph for 'destination'-info
// --------------------------------------------------------------------------------
function createTripInfo_Destination(trip_card_info, geoNamesData){

    console.log('6.2.1) create trip-info-destination');

    // retrieve object values
    const city = geoNamesData.city;
    const country = geoNamesData.country;

    // create paragraph with span element
    const p = document.createElement('p');
    p.innerHTML = 'My trip to: ';
    p.style.fontWeight = 'bold';

    const s = document.createElement('span');
    s.innerHTML = `${city}, ${country}`;
    s.style.fontWeight= 'normal';
    
    // append paragraph to trip_card_info
    p.appendChild(s);
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.2.2) function createTripInfo_Departing: creates paragraph for 'departing'-info
// --------------------------------------------------------------------------------
function createTripInfo_Departing(trip_card_info, startDate){

    console.log('6.2.2) create trip-info-departing');

    // create paragraph with span element
    const p = document.createElement('p');
    p.innerHTML = 'Departing: ';
    p.style.fontWeight = 'bold';

    const s = document.createElement('span');
    s.innerHTML = startDate;
    s.style.fontWeight= 'normal';
    
    // append paragraph to trip_card_info
    p.appendChild(s);
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.2.3) function createTripInfo_Returning: creates paragraph for 'returning'-info
// --------------------------------------------------------------------------------
function createTripInfo_Returning(trip_card_info, endDate){

    console.log('6.2.3) create trip-info-returning');

    // create paragraph with span element
    const p = document.createElement('p');
    p.innerHTML = 'Returning: ';
    p.style.fontWeight = 'bold';

    const s = document.createElement('span');
    s.innerHTML = endDate;
    s.style.fontWeight= 'normal';
    
    // append paragraph to trip_card_info
    p.appendChild(s);
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.2.4) function createTripInfo_TripDuration: creates paragraph for 'trip duration'-info
// --------------------------------------------------------------------------------
function createTripInfo_TripDuration(trip_card_info, tripDuration){

    console.log('6.2.4) create trip-info-trip-duration');

    // create paragraph with span element
    const p = document.createElement('p');
    p.innerHTML = 'Trip duration: ';
    p.style.fontWeight = 'bold';

    const s = document.createElement('span');

    if(tripDuration > 1){
        s.innerHTML = `${tripDuration} days`;
        s.style.fontWeight= 'normal';
    } else {
        s.innerHTML = `${tripDuration} day`;
        s.style.fontWeight= 'normal';
    }
    
    // append paragraph to trip_card_info
    p.appendChild(s);
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.2.5) function createTripInfo_XDaysAway: creates paragraph for 'x days away'-info
// --------------------------------------------------------------------------------
function createTripInfo_XDaysAway(trip_card_info, dayDifference, geoNamesData){

    console.log('6.2.5) create trip-info-x-days-away');

    // retrieve object values
    const city = geoNamesData.city;
    const country = geoNamesData.country;

    // create paragraph with span element
    const p = document.createElement('p');
    p.innerHTML = `${city}, ${country} is `;

    const s = document.createElement('span');
    if(dayDifference > 1){
        s.innerHTML = `${dayDifference} days`;
        s.style.fontWeight= 'bold';
    } else {
        s.innerHTML = `${dayDifference} day`;
        s.style.fontWeight= 'bold';
    }
    
    // append paragraph to trip_card_info
    p.appendChild(s);
    p.innerHTML += ' away!'
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.2.6) function createTripInfo_weather: creates paragraph for 'weather'-info if departure is in less then 16 days
// --------------------------------------------------------------------------------
function createTripInfo_Weather(trip_card_info, weatherbitData){

    console.log('6.2.6) create trip-info-weather');

    // retrieve object values
    const max_temp = weatherbitData.max_temp;
    const min_temp = weatherbitData.min_temp;
    const weather_description = weatherbitData.weather_description;

    // create multiple paragraphs with span elements
    const p = document.createElement('p');
    p.innerHTML = 'Typical weather ';
    p.style.fontWeight = 'bold';

    const s1 = document.createElement('span');
    s1.innerHTML = 'for then is: ';
    s1.style.fontWeight = 'normal';
    const br1 = document.createElement('br');

    const s2 = document.createElement('span');
    s2.innerHTML = `High: ${max_temp}°C, Low: ${min_temp}°C`;
    s2.style.fontSize = '14px';
    s2.style.fontWeight = 'normal';
    const br2 = document.createElement('br');

    const s3 = document.createElement('span');
    s3.innerHTML = weather_description;
    s3.style.fontSize = '14px';
    s3.style.fontWeight = 'normal';
    
    // append paragraph to trip_card_info
    p.appendChild(s1);
    p.appendChild(br1);
    p.appendChild(s2);
    p.appendChild(br2);
    p.appendChild(s3);
    trip_card_info.appendChild(p);
}

// --------------------------------------------------------------------------------
// 1.3) function createTripButtons: creates trip buttons for card
// --------------------------------------------------------------------------------
function createTripButtons(trip_card){

    console.log('6.3) create trip-buttons');

    // create div for trip-buttons
    const trip_card_buttons = document.createElement('div');
    trip_card_buttons.setAttribute('class', 'trip-card-buttons');

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

    // append buttons to trip_card_buttons
    trip_card_buttons.appendChild(btn1);
    trip_card_buttons.appendChild(btn2);
    trip_card_buttons.appendChild(btn3);
    trip_card_buttons.appendChild(btn4);

    trip_card.appendChild(trip_card_buttons);
};


// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    createTripImg,
    createTripInfo,
    createTripButtons
};