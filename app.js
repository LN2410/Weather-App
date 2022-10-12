window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  let temperatureDegree = document.querySelector("#temperature-degree");
  let locationTimezone = document.querySelector("#location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6fe0eab5e9dc8e9ddc040e2e9bcfbae9
`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const temp = data.list[0].main.temp;

          const tempDescription = data.list[0].weather[0].description;
          console.log(tempDescription);
          // const name = data.city;

          //Set DOM elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = tempDescription;
          locationTimezone.textContent = data.city.name;

          //set Icons
          setIcons(icon, document.querySelector("#icon"));
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    skycons.play();
    return skycons.set(iconId, icon);
  }
});
