const fetchData = async (endpoint, values = "") => {
  try {
    var response = await fetch(`http://hassioustka.duckdns.org:3355/${endpoint}/sUdwM2xbtu/${values}`);    
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default fetchData;
