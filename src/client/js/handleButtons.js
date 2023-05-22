// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function remove_trip_button: add event listener that removes trip card when remove-trip-button is pressed
// --------------------------------------------------------------------------------
function remove_trip_button(){

    console.log('7.1) Start function remove_trip_button');

    // Add event listener to the 'remove-trip'-button
    let removeButton = document.getElementById('remove-trip');

    removeButton.addEventListener('click', function(){
        let buttonsDiv = removeButton.parentNode;
        let tripCard = buttonsDiv.parentNode;

        tripCard.remove();
    });
}

// --------------------------------------------------------------------------------
// 1.2) function add_lodging_info_button: implement functionality for the add-lodging-info-button
// --------------------------------------------------------------------------------
function add_lodging_info_button(){

    console.log('7.2) Start function add_lodging_info_button');

    // Add event listener to the 'add-lodging-info'-button
    const btn_add_lodging_info = document.getElementById('btn-add-lodging-info');

    btn_add_lodging_info.addEventListener('click', function(){

        btn_add_lodging_info.classList.toggle('active_btn');
        const textAreaDiv = document.getElementById('textarea-add-lodging-info');

        if(textAreaDiv.style.display === 'none'){
            textAreaDiv.style.display = 'block';
        } else {
            textAreaDiv.style.display = 'none';
        }
    });
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    remove_trip_button,
    add_lodging_info_button
}