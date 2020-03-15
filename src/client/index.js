import "./styles/base.scss";
import { getCityInfo } from "./js/getCityInfo";
import { timeInterval } from "./js/timeInterval";
import fetch from "node-fetch";
import { objectData } from "./js/getCityInfo";

const submitBtn = document.getElementById("submit");
const destination = document.getElementById("destination");
const img = document.querySelector(".image-holder");
const image = document.getElementById("image");
const description = document.getElementById("description");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if (city && date) {
    getCityInfo(city, date);
    timeInterval(date);
    setTimeout(retriveData, 900);
  }
});
async function retriveData() {
  const data = await fetch("http://localhost:8080/travel-info");
  const info = await data.json();
  setTimeout(updateUi(info), 450);
}

function updateUi(information) {
  img.style.backgroundImage = `url("${information.image.imageLink}")`;
  //image.src = `${information.image.imageLink}`;
  description.innerText = `${information.city}, ${information.country}`;
}
