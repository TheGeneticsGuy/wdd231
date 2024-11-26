const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector('figcaption');

// Let's build the API tools now w/key
const key = '08ba610f5ded3429b31956615a68dcb4';
const lat = '49.75'
const lon = '6.37'

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayResults = (data) => {
    currentTemp.innerHTML = `${convertTemperature(data.main.temp, 'F').toFixed(1)} &deg;F`
}

const convertTemperature = (kelvin, unit = 'C') => {
    if (unit === 'C') {
        return kelvin - 273.15; // Kelvin to Celsius
    } else if (unit === 'F') {
        return (kelvin - 273.15) * 9 / 5 + 32; // Kelvin to Fahrenheit
    } else {
        return kelvin; // Return Kelvin as default.
    }
};

apiFetch();
