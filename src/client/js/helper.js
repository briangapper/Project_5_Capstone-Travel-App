// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function calculateTimeDifference: calculate time difference
// --------------------------------------------------------------------------------
function calculateTimeDifference(){

    // retrieve departing user input and change the format
    const inputDate = document.getElementById('input-date').value;
    const parts = inputDate.split('-');
    const transformedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

    console.log('User departure: ', transformedDate);
    
    // calculate the time difference
    const selectedDate = new Date(inputDate);
    const currentDate = new Date();
    const timeDifference = selectedDate.getTime() - currentDate.getTime();

    const msPerDay = 24*60*60*1000;
    const dayDifference = Math.ceil(timeDifference / msPerDay);

    return { transformedDate, dayDifference };
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************

export {
    calculateTimeDifference
}