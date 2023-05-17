// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function checkUserInput: check if user has entered valid inputs
// --------------------------------------------------------------------------------
function checkUserInput(inputDestination, inputDate){

    try {

        console.log('1.1) Start function checkUserInput');
        
        // check if 'date' user input is in the future
        const currentDate = new Date();
        const departingDate = new Date(inputDate);

        if(departingDate < currentDate){
            alert('The departing date must be in the future!');
            throw new Error('The departing date must be in the future!');
        }

        // check if 'destination' user input is not empty
        if(!inputDestination){
            alert('Please enter a destination.');
            throw new Error('Please enter a destination.');
        }

        // check if 'date' user input is not empty
        if(!inputDate){
            alert('Please enter a departing date.');
            throw new Error('Please enter a departing date.');
        }

    } catch (error) {
        console.log('Error function checkUserInput', error);
        throw error;
    }
}

// --------------------------------------------------------------------------------
// 1.2) function calculateTimeDifference: calculate days till departure
// --------------------------------------------------------------------------------
function calculateTimeDifference(inputDate){

    console.log('1.2) Start function calculateTimeDifference');

    try {

        // transform format
        const parts = inputDate.split('-');
        const transformedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

        // calculate days till departure
        const selectedDate = new Date(inputDate);
        const currentDate = new Date();
        const timeDifference = selectedDate.getTime() - currentDate.getTime();

        const msPerDay = 24*60*60*1000;
        const dayDifference = Math.ceil(timeDifference / msPerDay);

        return { transformedDate, dayDifference };

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