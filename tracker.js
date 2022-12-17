const apiKey = "at_oh9HGxMmZdwMQANyFGDaCLnVWLKIY";
const customIp = "192.212.174.101";
const myMap = document.querySelector(".map-container");

const userTimezone = document.querySelector(".timezone-show");
const userLocation = document.querySelector(".location-show");
const userAdress = document.querySelector(".input-show");
const userIsp = document.querySelector(".isp-show");

const form = document.querySelector("form");
const input = document.querySelector(".input");
const button = document.getElementById("btn");

const fetchUserAdress = () => {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${input.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      const ip = `${ipAddress}`;
      userAdress.insertAdjacentHTML("beforeend", ip);

      const country = data.location.country;
      const region = data.location.region;
      const city = data.location.city;
      const location = `${country}, ${region}, ${city}`;
      userLocation.insertAdjacentHTML("beforeend", location);

      const dtz = data.location.timezone;
      const timeZone = `${dtz}`;
      userTimezone.insertAdjacentHTML("beforeend", timeZone);

      const ispData = data.isp;
      const isp = `${ispData}`;
      userIsp.insertAdjacentHTML("beforeend", isp);

      const lat = data.location.lat;
      const lng = data.location.lng;
      let coords = [lat, lng];

      myMap.innerHTML = "<div id='map'></div>";
      mapFunction(coords);
    });
};
const reload = (e) => {
  e.preventDefault();
  userAdress.innerHTML = " ";
  userLocation.innerHTML = " ";
  userTimezone.innerHTML = " ";
  userIsp.innerHTML = " ";
  fetchUserAdress(input.value);
};
form.addEventListener("submit", reload);
fetchUserAdress(customIp);

const mapFunction = (coordinates) => {
  const map = L.map("map").setView(coordinates, 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker(coordinates)
    .addTo(map)
    .bindPopup("You are somewhere around here!")
    .openPopup();
};
