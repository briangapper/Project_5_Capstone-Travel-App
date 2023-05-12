// Define port and server paths
const port = 8000;
const pathGeoNames = `http://localhost:${port}/geoNames`;

// async function planTrip: main function that encompasses all function calls
async function planTrip(event){

    console.log('1.) Start function planTrip');

    // prevent default 'click' behavior
    event.preventDefault();

    // retrieve destination user input
    const inputDestination = document.getElementById('destination').value.trim();
    console.log('User destination: ', inputDestination)

    try {

        const data = await getLocationData(inputDestination);


    } catch (error) {

        console.log('Error function planTrip', error);

    }
};

/* 2) async function getWeatherDataAPI: request temperature from API */
async function getLocationData(inputDestination){

    console.log('2.) Start function getLocationData');

    fetch(`${pathGeoNames}?destination=${inputDestination}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('Response geoNames: ', data);
        })
        .catch(error => {
            // Handle errors
            console.log(error);
        })
}


export {

    planTrip

}
