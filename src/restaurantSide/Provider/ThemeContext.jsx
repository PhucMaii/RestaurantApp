import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

function ThemeContextAPI({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const toggleDarkTheme = (value) => {
        setIsDarkTheme(value);
    }

    return (
        <ThemeContext.Provider value={{isDarkTheme, toggleDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeContextAPI.propTypes = {
    children: PropTypes.node
}

export { ThemeContextAPI, ThemeContext }