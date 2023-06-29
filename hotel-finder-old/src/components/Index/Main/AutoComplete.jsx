import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

function AutoComplete() {
  const [selectedOption, setSelectedOption] = useState([]);

  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grapefruit",
    "Honeydew",
    "Lemon",
    "Mango",
  ];

  const handleSelection = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <Typeahead
      options={options}
      emptyLabel="Brak pasujących wyników"
      minLength={1}
      selected={selectedOption}
      onChange={handleSelection}
      placeholder="Wybierz miasto"
    />
  );
}

export default AutoComplete;
