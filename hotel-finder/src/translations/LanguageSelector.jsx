import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    const selectedLanguage = lang;
    i18n.changeLanguage(selectedLanguage);
    setSelectedLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    const defaultLanguage = storedLanguage || i18n.language;
    i18n.changeLanguage(defaultLanguage);
    setSelectedLanguage(defaultLanguage);
  }, [i18n]);

  let languages = [
    { name: "Polski", value: "pl" },
    { name: "English", value: "en" },
  ];

  return (
    <>
      <div className="dropdown position-fixed top-0 end-0 mt-3 me-3">
        <button
          className="btn btn-primary dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (light)">
          <svg className="bi my-1" width="5px" height="10px">
            <use href="#sun-fill"></use>
          </svg>
          <MdLanguage />
          <span className="visually-hidden" id="bd-theme-text">
            Toggle theme
          </span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow bg-white" style={{ zIndex: "1000" }}>
          {languages.map((lang, index) => (
            <li key={index}>
              <button
                onClick={() => changeLanguage(lang.value)} // Wrap the function call inside an arrow function
                type="button"
                className={`dropdown-item d-flex align-items-center ${
                  selectedLanguage === lang.value && "active"
                }`}>
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LanguageSelector;
