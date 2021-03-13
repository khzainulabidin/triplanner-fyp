import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import {Provider} from "react-redux";
import store from "./redux/store";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
