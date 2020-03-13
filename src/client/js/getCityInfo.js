import { postData } from "./postCityData";

export async function getCityInfo(city, date) {
  const baseUrl = "http://api.geonames.org/searchJSON?q=";
  const userName = "username=dobaizsolt";
  const apiSetting = "+&maxRows=1&";
  const data = await fetch(`${baseUrl}${city}${apiSetting}${userName}`);
  const parsed = await data.json();
  const objectData = {
    city: city,
    date: date,
    country: parsed.geonames[0].countryName,
    lon: parsed.geonames[0].lng,
    lat: parsed.geonames[0].lat
  };
  console.log(objectData);
  postData("http://localhost:8080/travel-info", objectData);
}
