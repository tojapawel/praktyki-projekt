const fetchCities = async () => {
  const API_KEY = "sUdwM2xbtu";
  try {
    const response = await fetch("http://hassioustka.duckdns.org:3355/getcities/" + API_KEY);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
};

export default fetchCities;
