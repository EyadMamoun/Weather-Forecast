var navBtn = document.querySelector('.nav-btn');
var navMedia = document.querySelector('.nav-media');
var clickCount = 0;
navBtn.addEventListener('click',function(){
    clickCount++;
    if(clickCount%2 != 0)
    {
        navMedia.classList.remove('d-none');
    }
    else
    {
        navMedia.classList.add('d-none');
    }
})

if(localStorage.getItem('lastReading') != null)
{
    getWeather(JSON.parse(localStorage.getItem('lastReading')));
}

var searchInput = document.getElementById('Search');

searchInput.addEventListener('keypress',function(eventInfo){
    getWeather(eventInfo.target.value);
})

async function getWeather(city)
{
    var weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2d22efba7e38403a9a4142730243011&q=${city}&days=2`);
    var finalWeather = await weather.json();
    displayDate(finalWeather);
    displayCurrentWeather(finalWeather);
    displayDayOneWeather(finalWeather);
    displayDayTwoWeather(finalWeather);
    localStorage.setItem('lastReading',JSON.stringify(finalWeather.location.name));
    console.log(finalWeather);
}

function displayDate(arr)
{
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = new Date(arr.location.localtime);
    var day = days[date.getDay()];
    var tomorrow = days[date.getDay() + 1];
    var afterTomorrow = days[date.getDay() + 2];
    var fullDate = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

    var currentDay = ``;
    currentDay = `<p class="mb-0 ps-2">${day}</p>
                    <p class="mb-0 pe-2">${fullDate}</p>`

    var tomorrowDay = `${tomorrow}`
    var afterTomorrowDay = `${afterTomorrow}`;

    document.querySelector('.Side-Head1').innerHTML = currentDay;
    document.querySelector('.Middle-Head').innerHTML = tomorrowDay;
    document.querySelector('.Side-Head2').innerHTML = afterTomorrowDay;
}

function displayCurrentWeather(arr)
{
    var box = ``;
    box = `<p class="my-3 ms-2 text-light">${arr.location.name}</p>
            <h2 class="temp text-white ms-2">${arr.current.temp_c}°C</h2>
            <div class="currentWeatherStateIcon">
                <img class="w-100" src="https:${arr.current.condition.icon}" alt="Weather-Icon">
            </div>
            <p class="ms-2 fs-6 text-info">${arr.current.condition.text}</p>
            <i class="weather-characteristics fa-solid fa-umbrella ms-2"></i><p class="weather-characteristics d-inline-block">${arr.current.cloud}%</p>
            <i class="weather-characteristics fa-solid fa-wind ms-2"></i><p class="weather-characteristics d-inline-block">${arr.current.wind_kph}Km/h</p>
            <i class="weather-characteristics fa-regular fa-compass ms-2"></i><p class="weather-characteristics d-inline-block">East</p>`
    
    document.querySelector('.Side-Body1').innerHTML = box;
}

function displayDayOneWeather(arr)
{
    var box = ``;
    box = `<div class="forecastWeatherStateIcon mx-auto">
                <img class="w-100" src="https:${arr.forecast.forecastday[0].day.condition.icon}" alt="">
            </div>
            <h2 class="fs-3 mt-3">${arr.forecast.forecastday[0].day.maxtemp_c}°C</h2>
            <p class="fs-5 text-secondary mb-3">${arr.forecast.forecastday[0].day.mintemp_c}°C</p>
            <p class="fs-6 text-info">${arr.forecast.forecastday[0].day.condition.text}</p>`

    document.querySelector('.Middle-Body'). innerHTML = box;
}

function displayDayTwoWeather(arr)
{
    var box = ``;
    box = `<div class="forecastWeatherStateIcon mx-auto">
                <img class="w-100" src="https:${arr.forecast.forecastday[1].day.condition.icon}" alt="">
            </div>
            <h2 class="fs-3 mt-3">${arr.forecast.forecastday[1].day.maxtemp_c}°C</h2>
            <p class="fs-5 text-secondary mb-3">${arr.forecast.forecastday[1].day.mintemp_c}°C</p>
            <p class="fs-6 text-info">${arr.forecast.forecastday[1].day.condition.text}</p>`

    document.querySelector('.Side-Body2'). innerHTML = box;
}
