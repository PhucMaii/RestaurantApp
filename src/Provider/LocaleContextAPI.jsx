import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import i18n from "../i18n";

const LocaleContext = createContext('');

function LocaleContextAPI({children}) {
    const [locale, setLocale] = useState('en');
    i18n.on('languageChanged', () => setLocale(i18n.language));
    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <LocaleContext.Provider value={{locale, setLocale, handleChangeLanguage}}>
            {children}
        </LocaleContext.Provider>
    )       
}

LocaleContextAPI.propTypes = {
    children: PropTypes.node
}

export { LocaleContextAPI, LocaleContext }