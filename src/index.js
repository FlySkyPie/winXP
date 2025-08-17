import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'assets/clear.css';
import 'assets/font.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Simple approach: Just make sure the DOM is ready before rendering
// This is the standard way React handles this in Create React App
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}

serviceWorker.unregister();

if (module.hot && !window.frameElement) {
  console.log('HMR enabled');
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      ReactDOM.render(<NextApp />, rootElement);
    } else {
      console.error('Root element not found during hot reload.');
    }
  });
}
