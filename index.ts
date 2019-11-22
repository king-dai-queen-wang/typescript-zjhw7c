// Import stylesheets
import './style.css';
import {Rating} from './rating.model.ts';
const num = 3;

const rating =  new Rating('#rating', num);
rating.initRating(num);
