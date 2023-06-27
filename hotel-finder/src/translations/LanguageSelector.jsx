import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setSelectedLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    const defaultLanguage = storedLanguage || i18n.language;
    i18n.changeLanguage(defaultLanguage);
    setSelectedLanguage(defaultLanguage);
  }, [i18n]);

  return (
    <>
      <select onChange={changeLanguage} value={selectedLanguage}>
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
    </>
  );
}

export default LanguageSelector;
