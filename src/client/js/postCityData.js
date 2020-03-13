export async function postData(url, city, date) {
  const object = {
    city: city,
    date: date
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
