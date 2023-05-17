// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function checkUserInput: check if user has entered valid inputs
// --------------------------------------------------------------------------------
function checkUserInput(destination, startDate, endDate){

    try {

        console.log('1.1) Start function checkUserInput');

        // check that 'destination' is not empty
        if(!destination){
            alert('Please enter a destination.');
            throw new Error('Please enter a destination.');
        }

        // check that 'start-date' is not empty
        if(!startDate){
            alert('Please enter a departing date.');
            throw new Error('Please enter a departing date.');
        }

        // create date objects for comparison
        const currentDate = new Date();
        const departingDate = new Date(startDate);
        const returningDate = new Date(endDate);

        // check that 'start-date' is not in the past
        if(departingDate < currentDate){
            alert('The departing date must be in the future!');
            throw new Error('The departing date must be in the future!');
        }

        // check that 'end-date' is greater than 'start-date', if it wasn't left empty
        if(endDate !== '' && returningDate < departingDate){
            alert('The returning date must be greater than the departing date!');
            throw new Error('The returning date must be greater than the departing date!');
        }

    } catch (error) {
        console.log('Error function checkUserInput', error);
        throw error;
    }
}

// --------------------------------------------------------------------------------
// 1.2) function calculateTimeDifference: calculate days till departure
// --------------------------------------------------------------------------------
function calculateTimeDifference(startDate, endDate){

    console.log('1.2) Start function calculateTimeDifference');

    try {

        // transform start-date format
        const parts_startDate = startDate.split('-');
        const transformed_startDate = parts_startDate[2] + '/' + parts_startDate[1] + '/' + parts_startDate[0];

        // transform end-date format
        const parts_endDate = endDate.split('-');
        const transformed_endDate = parts_endDate[2] + '/' + parts_endDate[1] + '/' + parts_endDate[0];

        // create date objects for comparison
        const departingDate = new Date(startDate);
        const returningDate = new Date(endDate);
        const currentDate = new Date();
        let timeDifference = 0;

        // calculate days until departure
        timeDifference = departingDate.getTime() - currentDate.getTime();
        const msPerDay = 24*60*60*1000;
        const dayDifference = Math.ceil(timeDifference / msPerDay);

        // calculate trip duration
        timeDifference = returningDate.getTime() - departingDate.getTime();
        const tripDuration = Math.ceil(timeDifference / msPerDay);

        // console.log(`Start Date: ${transformed_startDate}, End Date: ${transformed_endDate}, Day until departure: ${dayDifference}, Trip duration: ${tripDuration}`)

        return { transformed_startDate, transformed_endDate, dayDifference, tripDuration };

    } catch (error) {
        console.log('Error function calculateTimeDifference', error);
    }
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    calculateTimeDifference,
    checkUserInput
}