import express from 'express';
import fetch from 'node-fetch';

const app = express();


const weatherCodes = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast clouds",
    45: "mist",
    48: "fog",
    51: "light rain",
    61: "rain",
    63: "heavy rain",
    71: "snow",
    80: "shower rain",
    95: "thunderstorm",
};

const weatherIcons = {
    "clear sky": "",
    "few clouds": "",
    "scattered clouds": "",
    "broken clouds": "",
    "shower rain": "",
    "rain": "",
    "thunderstorm": "",
    "snow": "",
    "mist": "",
    "overcast clouds": "",
    "light rain": "",
};

app.get('/weather', async (req, res) => {
    const lat = 10.762622; // Ho Chi Minh latitude
    const lon = 106.660172; // Ho Chi Minh longitude
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;
    try {
        console.log('🚀 Calling Open-Meteo API...');
        const response = await fetch(url);
        const data = await response.json();

        const code = data.current.weathercode;
        const temp = Math.round(data.current.temperature_2m);
        const icon = weatherIcons[weatherCodes[code]] || '🌈';

        const weatherInfo = `${icon} ${temp}°C`;
        console.log('🚀 Weather Info:', weatherInfo);
        res.send(weatherInfo);
    } catch (error) {
        console.error('🚀 Error:', error);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(8089, '0.0.0.0', () => {
    console.log('Weather server running on port 8089');
});