import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';

const mapScript = document.createElement("script");
mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
document.head.append(mapScript);

ReactDOM.render(<App/>, document.getElementById('root')
);
