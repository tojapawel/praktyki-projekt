const changeAvailable = async (roomid, value) => {
  const API_KEY = "sUdwM2xbtu";

  try {
    const response = await fetch(`http://hassioustka.duckdns.org:3355/changeavailable/${API_KEY}/${roomid}/${value}`);
    const data = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default changeAvailable;
