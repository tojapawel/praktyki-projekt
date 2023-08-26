const fetchAttractions = async (hotelid) => {
    const API_KEY = "sUdwM2xbtu";
    try {
      const response = await fetch("http://hassioustka.duckdns.org:3355/getattractions/" + API_KEY + "/" + hotelid);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      // FIXME: ogarnąć żeby nie wyświtlało tego błędu jak nie ma atrakcji dla danego hotelu
      console.log("Error: ", error);
      return [];
    }
  };
  
  export default fetchAttractions;
  