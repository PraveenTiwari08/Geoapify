async function getTimeZone(type, data1) {
  try {
    let data;
    if (type === "position") {
      const [lat, long] = await getPosition();
      data = await fetchTimeZone([lat, long], type);
    } else {
      data = await fetchTimeZone(data1, type);
    }
    if (type === "text") return data.features[0].properties;
    return data.results[0];
  } catch (err) {}
}

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (positon) => {
        resolve([positon.coords.latitude, positon.coords.longitude]);
      },
      (err) => reject()
    );
  });
}

async function fetchTimeZone(data, type) {
  let url;
  if (type === "position") {
    const [lat, long] = data;
    url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=18bf7e3910a1491180c0c84ab1eee638`;
  }
  if (type === "text") {
    url = `https://api.geoapify.com/v1/geocode/search?text=${data}&apiKey=18bf7e3910a1491180c0c84ab1eee638`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
