// ********************************************************************************
// --------------------------------------------------------------------------------
// 1.) FUNCTIONS
// --------------------------------------------------------------------------------
// ********************************************************************************

// --------------------------------------------------------------------------------
// 1.1) function add_lodging_info_button: implement functionality for the add-lodging-info-button
// --------------------------------------------------------------------------------
function add_lodging_info_button(unique_identifier){

    console.log('7.1) Start function add_lodging_info_button');

    // Add event listener to the 'add-lodging-info'-button
    const btn_add_lodging_info = document.getElementById(`btn-add-lodging-info-${unique_identifier}`);

    btn_add_lodging_info.addEventListener('click', function(){

        btn_add_lodging_info.classList.toggle('active_btn');
        const textAreaDiv = document.getElementById(`textarea-add-lodging-info-${unique_identifier}`);

        if(textAreaDiv.style.display === 'none'){
            textAreaDiv.style.display = 'block';
        } else {
            textAreaDiv.style.display = 'none';
        }
    });
}

// --------------------------------------------------------------------------------
// 1.2) function add_packing_list_button: implement functionality for the add-packing-list-button
// --------------------------------------------------------------------------------
function add_packing_list_button(unique_identifier){

    console.log('7.2) Start function add_packing_list_button');

    // Add event listener to the 'add-packing-list'-button
    const btn_add_packing_list = document.getElementById(`btn-add-packing-list-${unique_identifier}`);

    btn_add_packing_list.addEventListener('click', function(){

        btn_add_packing_list.classList.toggle('active_btn');
        const textAreaDiv = document.getElementById(`textarea-add-packing-list-${unique_identifier}`);

        if(textAreaDiv.style.display === 'none'){
            textAreaDiv.style.display = 'block';
        } else {
            textAreaDiv.style.display = 'none';
        }
    });
}

// --------------------------------------------------------------------------------
// 1.3) function add_notes_button: implement functionality for the add-notes-button
// --------------------------------------------------------------------------------
function add_notes_button(unique_identifier){

    console.log('7.3) Start function add_notes_button');

    // Add event listener to the 'add-notes'-button
    const btn_add_notes = document.getElementById(`btn-add-notes-${unique_identifier}`);

    btn_add_notes.addEventListener('click', function(){

        btn_add_notes.classList.toggle('active_btn');
        const textAreaDiv = document.getElementById(`textarea-add-notes-${unique_identifier}`);

        if(textAreaDiv.style.display === 'none'){
            textAreaDiv.style.display = 'block';
        } else {
            textAreaDiv.style.display = 'none';
        }
    });
}

// --------------------------------------------------------------------------------
// 1.4) function remove_trip_button: add event listener that removes trip card when remove-trip-button is pressed
// --------------------------------------------------------------------------------
function remove_trip_button(unique_identifier){

    console.log('7.4) Start function remove_trip_button');

    // Add event listener to the 'remove-trip'-button
    let removeButton = document.getElementById(`btn-remove-trip-${unique_identifier}`);

    removeButton.addEventListener('click', function(){
        let divRemoveTrip = removeButton.parentNode;
        let divButtons = divRemoveTrip.parentNode;
        let tripCard = divButtons.parentNode;

        tripCard.remove();
    });
}

// ********************************************************************************
// --------------------------------------------------------------------------------
// 2.) EXPORTS
// --------------------------------------------------------------------------------
// ********************************************************************************
export {
    add_lodging_info_button,
    add_packing_list_button,
    add_notes_button,
    remove_trip_button
}