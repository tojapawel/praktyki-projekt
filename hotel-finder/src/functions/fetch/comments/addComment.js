const addComment = async (hotelid, author, comment) => {
  const API_KEY = "sUdwM2xbtu";

  try {
    const response = await fetch(`http://hassioustka.duckdns.org:3355/addcomment/${API_KEY}/${hotelid}/${author}/${comment}`);
    const data = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default addComment;
