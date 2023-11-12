import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

function ThemeContextAPI({ children }) {
    const [isLocalDarkTheme, setIsLocalDarkTheme] = useLocalStorage("isDarkTheme", false);
    const [isDarkTheme, setIsDarkTheme] = useState(isLocalDarkTheme);
    const toggleDarkTheme = (value) => {
        setIsDarkTheme(value);
    }
    const toggleDarkThemeOnLocal = (value) => {
        setIsLocalDarkTheme(value);
    }
    return (
        <ThemeContext.Provider value={{isDarkTheme, toggleDarkTheme, toggleDarkThemeOnLocal}}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeContextAPI.propTypes = {
    children: PropTypes.node
}

export { ThemeContextAPI, ThemeContext }