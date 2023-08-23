const fetchAttractions = async (roomid) => {
    const API_KEY = "sUdwM2xbtu";
    try {
      const response = await fetch("http://hassioustka.duckdns.org:3355/getroom/" + API_KEY + "/" + roomid);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log("Error: ", error);
      return [];
    }
  };
  
  export default fetchAttractions;
  