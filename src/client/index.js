import "./styles/base.scss";
import { getCityInfo } from "./js/getCityInfo";
import { timeInterval } from "./js/timeInterval";

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if (city && date) {
    getCityInfo(city, date);
    timeInterval(date);
  }
});
