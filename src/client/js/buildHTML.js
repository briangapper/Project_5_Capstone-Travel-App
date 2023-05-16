// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function createTripImg: creates trip img for card
// --------------------------------------------------------------------------------
function createTripImg(trip_card, geoNamesData, pixabayData){

    console.log('5.1) create trip-img');

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
function createTripInfo(trip_card, inputDate, dayDifference, geoNamesData, weatherbitData){

    console.log('5.2) create trip-info');

    // create div for trip-info
    const trip_card_info = document.createElement('div');
    trip_card_info.setAttribute('class', 'trip-card-info');
    
    // creates paragraph for 'destination'-info
    createTripInfo_Destination(trip_card_info, geoNamesData);

    // creates paragraph for 'departing'-info
    createTripInfo_Departing(trip_card_info, inputDate);

    // creates paragraph for 'x days away'-info
    createTripInfo_XDaysAway(trip_card_info, dayDifference, geoNamesData);

    // creates paragraph for 'weather'-info if departure is in less then 16 days
    createTripInfo_Weather(trip_card_info, weatherbitData);
    
    // append info to trip_card
    trip_card.appendChild(trip_card_info);
};

// --------------------------------------------------------------------------------
// 1.2.1) function createTripInfo_Destination: creates paragraph for 'destination'-info
// --------------------------------------------------------------------------------
function createTripInfo_Destination(trip_card_info, geoNamesData){

    console.log('5.2.1) create trip-info-destination');

    // retrieve object values
    const city = geoNamesData.city;
    const country = geoNamesData.country;

    // create paragraph with span element
    const p1 = document.createElement('p');
    p1.innerHTML = 'My trip to: ';
    p1.style.fontWeight = 'bold';

    const s1 = document.createElement('span');
    s1.innerHTML = `${city}, ${country}`;
    s1.style.fontWeight= 'normal';
    
    // append paragraph to trip_card_info
    p1.appendChild(s1);
    trip_card_info.appendChild(p1);
}

// --------------------------------------------------------------------------------
// 1.2.2) function createTripInfo_Departing: creates paragraph for 'departing'-info
// --------------------------------------------------------------------------------
function createTripInfo_Departing(trip_card_info, inputDate){

    console.log('5.2.2) create trip-info-departing');

    // create paragraph with span element
    const p2 = document.createElement('p');
    p2.innerHTML = 'Departing: ';
    p2.style.fontWeight = 'bold';

    const s2 = document.createElement('span');
    s2.innerHTML = inputDate;
    s2.style.fontWeight= 'normal';
    
    // append paragraph to trip_card_info
    p2.appendChild(s2);
    trip_card_info.appendChild(p2);
}

// --------------------------------------------------------------------------------
// 1.2.3) function createTripInfo_XDaysAway: creates paragraph for 'x days away'-info
// --------------------------------------------------------------------------------
function createTripInfo_XDaysAway(trip_card_info, dayDifference, geoNamesData){

    console.log('5.2.3) create trip-info-x-days-away');

    // retrieve object values
    const city = geoNamesData.city;
    const country = geoNamesData.country;

    // create paragraph with span element
    const p3 = document.createElement('p');
    p3.innerHTML = `${city}, ${country} is `;

    const s3 = document.createElement('span');
    if(dayDifference > 1){
        s3.innerHTML = `${dayDifference} days`;
        s3.style.fontWeight= 'bold';
    } else {
        s3.innerHTML = `${dayDifference} day`;
        s3.style.fontWeight= 'bold';
    }
    
    // append paragraph to trip_card_info
    p3.appendChild(s3);
    p3.innerHTML += ' away!'
    trip_card_info.appendChild(p3);
}

// --------------------------------------------------------------------------------
// 1.2.4) function createTripInfo_weather: creates paragraph for 'weather'-info if departure is in less then 16 days
// --------------------------------------------------------------------------------
function createTripInfo_Weather(trip_card_info, weatherbitData){

    // check if weatherbitData object contains values
    if(Object.keys(weatherbitData).length > 0){

        console.log('5.2.4) create trip-info-weather');

        // retrieve object values
        const max_temp = weatherbitData.max_temp;
        const min_temp = weatherbitData.min_temp;
        const weather_description = weatherbitData.weather_description;

        // create multiple paragraphs with span elements
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
        
        // append paragraph to trip_card_info
        p4.appendChild(s4);
        p4.appendChild(br1);
        p4.appendChild(s5);
        p4.appendChild(br2);
        p4.appendChild(s6);
        trip_card_info.appendChild(p4);
    }
}

// --------------------------------------------------------------------------------
// 1.3) function createTripButtons: creates trip buttons for card
// --------------------------------------------------------------------------------
function createTripButtons(trip_card){

    console.log('5.3) create trip-buttons');

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