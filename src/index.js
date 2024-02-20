import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import appState from './store/index'

import { createRoot } from 'react-dom/client'; //React 18

// ReactDOM.render(<Provider appState={appState} ><App /></Provider>, document.getElementById('root'));
console.reportErrorsAsExceptions = false;

createRoot(document.getElementById('root')).render(
    <Provider appState={appState} >
        <App />
    </Provider> 
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
