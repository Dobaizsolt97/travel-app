export async function postData(url, objectData) {
  const object = {
    city: objectData.city,
    date: objectData.date,
    latitude: objectData.lat,
    longitude: objectData.lon,
    country: objectData.country
  };
  const result = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  });
}
