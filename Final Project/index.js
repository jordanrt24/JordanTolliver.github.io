function drawWeather(data) {
    let fahrenheit = Math.round(data.main.temp);
    let max_fahrenheit = Math.round(data.main.temp_max);
    let min_fahrenheit = Math.round(data.main.temp_min);
    document.getElementById('description').innerHTML = data.weather[0].description;
    document.getElementById('temp').innerHTML = fahrenheit + '°F';
    document.getElementById('h_temp').innerHTML = "H:" + max_fahrenheit + '°F';
    document.getElementById('l_temp').innerHTML = "L:" + min_fahrenheit + '°F';
    document.getElementById('city-name').innerHTML = data.name;
    document.getElementById('wind-speed').innerHTML = data.wind.speed + "miles/hr";
    let iconName = data.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/wn/" + iconName + "@2x.png";
    console.log(iconURL);
    document.getElementById('weather-icon').src = iconURL;
    backgroundChanger(data);
  }

  function backgroundChanger(data) {
    let weatherType = data.weather[0].main;
    console.log(weatherType);
    if (weatherType === 'Thunderstorm') {
      document.getElementById('demo-wrap').src = 'https://miro.medium.com/max/1400/1*6d5dw6dPhy4vBp2vRW6uzw.png'
    }
    if (weatherType === 'Drizzle') {
      document.getElementById('demo-wrap').src = 'https://miro.medium.com/max/1400/1*6d5dw6dPhy4vBp2vRW6uzw.png'
    }
    if (weatherType === 'Rain') {
      document.getElementById('demo-wrap').src = 'https://miro.medium.com/max/1400/1*6d5dw6dPhy4vBp2vRW6uzw.png'
    }
    if (weatherType === 'Snow') {
      document.getElementById('demo-wrap').src = 'https://miro.medium.com/max/1400/1*6d5dw6dPhy4vBp2vRW6uzw.png'
    }
    if (weatherType === 'Atmosphere') {
      document.getElementById('demo-wrap').src = 'https://ichef.bbci.co.uk/images/ic/1200x675/p09gny3j.jpg'
    }
    if (weatherType === 'Clear') {
      document.getElementById('demo-wrap').src = 'https://www.twoinchbrush.com/images/fanpaintings/fanpainting4157.jpg'
      console.log("PASSED")
    }
    if (weatherType === 'Cloud') {
      document.getElementById('demo-wrap').src = 'https://miro.medium.com/max/1400/1*6d5dw6dPhy4vBp2vRW6uzw.png'
    }
  }

  function fireProbability(data) {
    humidityLvl = data.main.humidity
    console.log(humidityLvl)
    if (humidityLvl <= 50) {
      document.getElementById('fire').innerHTML = "High"
      document.getElementById('fire').style.color = "red"
    }
    else {
      document.getElementById('fire').innerHTML = "Low"
      document.getElementById('fire').style.color = "green"
    }
  }

  function weather() {
    const API_KEY = "64b38d3f58717f4e8c8c6a8033addac1";
    const city_name = document.weatherForm.city.value;
    const base_url = "http://api.openweathermap.org/data/2.5/weather?";
    const final_url_geocoding = base_url + "appid=" + API_KEY + "&q=" + city_name + "&units=imperial";
    const coords = async function weatherAPI() {
      let resp = await fetch(final_url_geocoding);
      let data = await resp.json();
      console.log(data);
      if (data.cod === 200) {
        document.getElementById('error').style.display = "none";
        drawWeather(data);

        let lat = data.coord.lat;
        let long = data.coord.lon;
        fireProbability(data)
      }
      else {
        document.getElementById('error').style.display = "flex";
      }
    }
    coords()
  }
