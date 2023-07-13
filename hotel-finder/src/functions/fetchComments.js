const fetchComments = async (hotelid) => {
    const API_KEY = "sUdwM2xbtu";
    try {
      const response = await fetch(
        "http://hassioustka.duckdns.org:3355/comments/" + API_KEY + "/" + hotelid
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error: ", error);
      return [];
    }
  };
  
  export default fetchComments;