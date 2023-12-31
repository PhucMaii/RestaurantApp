import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeContextAPI } from './Provider/ThemeContext.jsx';
import { LocaleContextAPI }  from './Provider/LocaleContextAPI.jsx';
import './i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeContextAPI>
      <LocaleContextAPI>
        <App />
      </LocaleContextAPI>
    </ThemeContextAPI>
);
