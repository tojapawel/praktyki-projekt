const addComment = async (hotelid, author, comment) => {
  try {
    const response = await fetch(`http://hassioustka.duckdns.org:3355/addcomment/${hotelid}/${author}/${comment}`);
    const data = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default addComment;
