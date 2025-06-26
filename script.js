const apiKey = "c31ecaf00512f9871f72aee09dd802cb"; // Replace with your OpenWeatherMap API key

// Search by city
async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Search by current GPS location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      },
      () => {
        document.getElementById("weatherResult").innerHTML = "❌ Location access denied.";
      }
    );
  } else {
    document.getElementById("weatherResult").innerHTML = "❌ Geolocation not supported.";
  }
}

// Fetch and render weather data
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      document.getElementById("weatherResult").innerHTML = "❌ " + data.message;
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>🌡 Temp:</strong> ${data.main.temp}°C</p>
      <p><strong>🌤 Weather:</strong> ${data.weather[0].main}</p>
      <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>🌬 Wind:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "⚠️ Failed to fetch data.";
    console.error(error);
  }
}

