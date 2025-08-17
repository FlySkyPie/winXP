import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './assets/clear.css';
import './assets/font.css';
import App from './App';

// Simple approach: Just make sure the DOM is ready before rendering
// This is the standard way React handles this in Create React App
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}
