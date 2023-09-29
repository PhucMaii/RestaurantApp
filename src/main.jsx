import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeContextAPI } from './Provider/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextAPI>
      <App />
    </ThemeContextAPI>
  </React.StrictMode>,
);
