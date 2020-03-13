import "./styles/base.scss";
import { postData } from "./js/postCityData";

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if (city && date) postData("http://localhost:8080/travel-info", city, date);
});
