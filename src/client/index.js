// Import JS functions
import { planTrip } from './js/app';

// Import images
import mainImage from './images/paris.jpg';
img.src = mainImage;

// Import SASS files
import './styles/styles.scss'

// Event listener to add function to existing HTML DOM element
const saveTrip = document.getElementById('generate-trip-btn').addEventListener('click', planTrip);