export async function postWhen(url, time) {
  const object = {
    when: time
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
