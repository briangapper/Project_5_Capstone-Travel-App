// Import JS functions
import { planTrip } from './js/app';

// Import images
import paris from './images/paris.jpg';
import rom from './images/rom.jpg';
const img_paris = document.createElement('img');
const img_rom = document.createElement('img');
img_paris.src = paris;
img_rom.src = rom;

// Import SASS files
import './styles/styles.scss'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate-trip-btn').addEventListener('click', planTrip);

export {
    planTrip
}