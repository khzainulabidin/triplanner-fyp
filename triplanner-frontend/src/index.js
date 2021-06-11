import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const mapScript = document.createElement("script");
mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
document.head.append(mapScript);

const promise = loadStripe("pk_test_51J0lIlKPY5YHguOZFvFFrsM3FGQWpAWLBHbu4hBBNILw6EAmt2qFoGy9OPfCGDov5C93OPMykTfSTergJLaynp5K00hOj8iBnu");

ReactDOM.render(<Elements stripe={promise}><App/></Elements>, document.getElementById('root'));
