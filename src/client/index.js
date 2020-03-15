import "./styles/base.scss";
import { getCityInfo } from "./js/getCityInfo";

import fetch from "node-fetch";

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
    setTimeout(retriveData, 1300);
  }
});
async function retriveData() {
  const data = await fetch("http://localhost:8080/travel-info");
  const info = await data.json();
  updateUi(info);
}

function updateUi(information) {
  img.style.backgroundImage = `url("${information.image.imageLink}")`;
  //image.src = `${information.image.imageLink}`;
  description.innerText = `${information.city}, ${information.country}`;
}
