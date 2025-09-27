const API_KEY = "b8ffdf5945d950994297010b955ffbcd";

const weatherInfo = document.getElementById('weatherInfo')
const errorMessage = document.getElementById('errorMessage')
const cityInput = document.getElementById('cityInput')
const searchButton = document.getElementById('searchButton')

// Trdational method vs Using Async
// Traditional
// function getWeatherData(city) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
//     fetch(url)
//         .then((response) => {
//             console.log(response);
//         }).catch(error => {
//             console.log(error);
//         });   
// }

// Using async await

async function getWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
        // console.log(response);
    } catch (error) {
        console.log('First catch block')
        console.log(error)
    }
}

// Used in updateWeather()
const cityAndCountry = document.getElementById('cityAndCountry');
const tempValue      = document.getElementById('tempValue');
const weatherDesc    = document.getElementById('weatherDesc');
const humidityValue  = document.getElementById('humidityValue');
const windValue      = document.getElementById('windValue');

async function updateWeather() {

    const city = cityInput.value;

    if(!city) {
        displayError('City name cannot be empty');
        return;
    }

    try {
        // const weatherData = await getWeatherData(city); -- method 1
        const {name, sys, main, weather, wind,cod } = await getWeatherData(city); // method 2
        if (cod === '404') {
            displayError('Please enter a valid city name');
            return;
        }
        // weatherInfo.innerHTML = ` -- method 1
        //     <h2> ${weatherData.name}, ${weatherData.sys.country} </h2>
        //     <p>Temperature : ${weatherData.main.temp} C</p>
        //     <p> Weather : ${weatherData.weather[0].description} </p>
        //     <p> Humidity : ${weatherData.main.humidity}% </p>
        //     <p> Wind Speed : ${weatherData.wind.speed} m/s </p>            
        // `;

        // method 2
        // weatherInfo.innerHTML = `
        //     <h2> ${name}, ${sys.country} </h2>
        //     <p>Temperature : ${main.temp} C</p>
        //     <p> Weather : ${weather[0].description} </p>
        //     <p> Humidity : ${main.humidity}% </p>
        //     <p> Wind Speed : ${wind.speed} m/s </p>            
        // `;

        // Method 3 - directly loading to html attributes
        cityAndCountry.textContent = `${name}, ${sys.country}`;
        tempValue.textContent      = main.temp;
        weatherDesc.textContent    = weather[0].description;
        humidityValue.textContent  = main.humidity;
        windValue.textContent      = wind.speed;
        weatherInfo.classList.remove('hidden');

        // setInterval(updateWeather, 2000) // To make continous calls every 2 seconds [ 2000 ]
        // setTimeout((updateWeather, 10 * 60 * 1000)) // To update details every 10 mins [ 10 *60 * 1000 ]
    } catch (error) {
        console.log('Second catch block')
        displayError('Server Error');
    }
}

function displayError(message) {
    errorMessage.textContent = message;
    weatherInfo.innerHTML = '';
}

searchButton.addEventListener('click', updateWeather);

// To use Enter in search bar
cityInput.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        updateWeather();
    }
});