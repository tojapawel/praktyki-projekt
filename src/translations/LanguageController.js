import React, { useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import enTranslations from './lang/en.json';
import plTranslations from './lang/pl.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations,
        },
        pl: {
            translation: plTranslations,
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <select onChange={changeLanguage} value={i18n.language}>
            <option value="en">English</option>
            <option value="pl">Polski</option>
        </select>
    );
}

export default LanguageSelector;