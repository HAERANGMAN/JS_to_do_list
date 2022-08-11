API_KEY = "b54275a227c1f77ff769ca316b7d7cff";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const wea_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const air_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(wea_url);
  console.log(air_url);
  // url요청 후 then으로 함수진행
  fetch(wea_url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector("#weather span:first-child");
      const weather = document.querySelector("#weather span:last-child");
      city.innerText = data.city.name;
      weather.innerText = `기온 : ${data.list[2].main.temp} / 습도 : ${data.list[2].main.humidity}% / 체감기온 : ${data.list[2].main.temp}`;
      //   기준시간 : ${data.list[2].dt_txt} /
      //   일출 = data.city.sunrise
      //   일몰 = data.city.sunset
      //   강수확률 = data.list[2].rain.3h
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// navigator.geolocation.getCurrentPosition(잘됐을때실행, 안됐을때 실행)

// 40개 어레이 : 아마도 3번째
// [0]
// clouds:
// all: 99
// [[Prototype]]: Object
// dt: 1659301200
// dt_txt: "2022-07-31 21:00:00"
// main:
// feels_like: 26.27
// grnd_level: 1003
// humidity: 94
// pressure: 1005
// sea_level: 1005
// temp: 25.24
// temp_kf: 0.34
// temp_max: 25.24
// temp_min: 24.9
// [[Prototype]]: Object
// pop: 0.84
// rain:
// 3h: 0.91
// [[Prototype]]: Object
// sys: {pod: 'd'}
// visibility: 10000
// weather: Array(1)
// 0: {id: 500, main: 'Rain', description: 'light rain', icon: '10d'}
// length: 1
// [[Prototype]]: Array(0)
// wind:
// deg: 103
// gust: 3.61
// speed: 1.78
// [[Prototype]]: Object
// [[Prototype]]: Object
