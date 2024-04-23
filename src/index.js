// Required imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling

/**
 * This is the entry point file of the React application where the App component
 * is rendered into the HTML document.
 */

// Render the App component into the div with id 'root' in the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
