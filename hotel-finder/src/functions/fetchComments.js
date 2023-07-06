const fetchComments = async (hotelid) => {
    try {
      const response = await fetch(
        "http://hassioustka.duckdns.org:3355/comments/" + hotelid
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error: ", error);
      return [];
    }
  };
  
  export default fetchComments;