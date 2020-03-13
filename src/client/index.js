import "./styles/base.scss";
import { getCityInfo } from "./js/getCityInfo";

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  console.log(city, date);
  if (city && date) {
    getCityInfo(city, date);
  }
});
