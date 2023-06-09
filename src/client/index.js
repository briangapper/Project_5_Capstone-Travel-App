// Import JS functions
import { planTrip } from './js/app';

// Import SASS files
import './styles/styles.scss'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate-trip-btn').addEventListener('click', planTrip);

export {
    planTrip
}