async function getWeather() {
  try {
    let cityName = document.querySelector("#city").value;

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bc583ad0cfaaf54190459162d807fe92&units=metric`
    );

    let data = await res.json();

    // console.log(data)

    // ---------oneCall API---------------------

    let res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=bc583ad0cfaaf54190459162d807fe92&units=metric`
    );

    let data7days = await res2.json();

    console.log(data7days.daily);

    if (data.cod == 404) {
      return;
    } else {
      displayWeather(data);
      showMap();
      sevenDayWeather(data7days.daily);
    }
  } catch (err) {
    console.log(err);
  }
}

function displayWeather(obj) {
  document.querySelector(".show").innerHTML = "";

  let div = document.createElement("div");
  div.setAttribute("class", "city-info");

  let locationIcon = document.createElement("img");
  locationIcon.setAttribute(
    "src",
    "https://img.icons8.com/?id=13778&size=2x&color=000000"
  );

  let cityName = document.querySelector("#city").value;

  let cityHeading = document.createElement("h2");
  cityHeading.textContent = cityName;

  let temp = document.createElement("p");
  temp.innerText = Math.floor(obj.main.temp) + `°C`;
  temp.setAttribute("id", "temprature");

  let realFeel = document.createElement("p");
  realFeel.textContent =
    "Feels like " + "     " + Math.floor(obj.main.feels_like) + `°C`;
  realFeel.setAttribute("id", "feel-like");

  let pressure = document.createElement("p");
  pressure.innerText = "Pressure : " + obj.main.pressure + "  " + "mb";

  let humidity = document.createElement("p");
  humidity.innerText = "Humidity : " + obj.main.humidity + "  " + "%";

  let tempIcon = document.createElement("img");
  tempIcon.src = "https://img.icons8.com/?id=qA3w9Yp2vY7r&size=2x&color=000000";

  let tempDiv = document.createElement("div");
  tempDiv.append(tempIcon, temp, realFeel);

  let otherDiv = document.createElement("div");
  otherDiv.setAttribute("class", "other-info");

  let windSpeed = document.createElement("p");
  windSpeed.textContent = "Wind speed : " + obj.wind.speed + "  " + "km/h";

  let visi = document.createElement("p");
  visi.textContent = "Visibility : " + obj.visibility + "  " + "km";

  otherDiv.append(windSpeed, pressure, humidity, visi);

  div.append(locationIcon, cityHeading, tempDiv, otherDiv);

  document.querySelector(".show").append(div);

  document.querySelector(".show").style.display = "block";
}

function showMap() {
  document.querySelector(".map").textContent = "";

  let nameofCity = document.querySelector("#city").value;

  let googleMap = document.createElement("div");

  googleMap.innerHTML = `<iframe width="450" height="300" style="border:0" loading="lazy" allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA-P7qneZTr9cIBmxty1VGkXZILdQXLzuw&q=${nameofCity}">
        </iframe>`;

  document.querySelector(".map").append(googleMap);
}

let dayOfWeek = new Date();
let day = dayOfWeek.getDay();

function sevenDayWeather(arr) {
  document.querySelector(".week-wise").innerHTML = " ";
  day = dayOfWeek.getDay();

  arr.map((ele) => {
    let dayName = day % 7;

    switch (dayName) {
      case 0:
        dayName = "Sun";
        break;

      case 1:
        dayName = "Mon";
        break;
      case 2:
        dayName = "Tue";
        break;
      case 3:
        dayName = "Wed";
        break;
      case 4:
        dayName = "Thu";
        break;
      case 5:
        dayName = "Fri";
        break;
      case 6:
        dayName = "Sat";
        break;
    }
    day++;

    let dayDiv = document.createElement("div");

    let day1 = document.createElement("p");
    day1.textContent = dayName;

    let sticker1 = document.createElement("img");
    sticker1.src =
      "https://img.icons8.com/?id=qA3w9Yp2vY7r&size=2x&color=000000";

    let day4 = document.createElement("p");
    day4.textContent = Math.floor(ele.temp.day) + `°C`;

    let day5 = document.createElement("p");
    day5.textContent = ele.humidity + " " + "%";

    let day6 = document.createElement("p");
    day6.textContent = ele.wind_speed + " " + "Km/h";

    dayDiv.append(day1, sticker1, day4, day5, day6);

    document.querySelector(".week-wise").append(dayDiv);
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("shows");
    } else {
      entry.target.classList.remove("shows");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
