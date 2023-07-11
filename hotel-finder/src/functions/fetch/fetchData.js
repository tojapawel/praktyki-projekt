const fetchData = async () => {
  try {
    const response = await fetch("http://hassioustka.duckdns.org:3355/data");
    const jsonData = await response.json();
    const data = JSON.parse(jsonData[0].hotels_json);
    return data;
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
};

export default fetchData;
