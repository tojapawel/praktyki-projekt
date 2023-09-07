const fetchAllHotels = async () => {
    const API_KEY = "sUdwM2xbtu";
    try {
      const response = await fetch("http://hassioustka.duckdns.org:3355/gethotels/" + API_KEY);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log("Error: ", error);
      return [];
    }
  };
  
  export default fetchAllHotels;
  

  // TODO: zrobić, żeby wszystkie fetch były jako jedna funkcja