// показ времени
function showTime() {
    const time = document.querySelector('.time');
    const date  = new Date();
    const currentTime =  date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    slideImg();
    setBg();
    setTimeout(showTime, 1000);
}

// пока даты
function showDate() {
    const element = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    element.textContent = currentDate;
}

// пока приветствия
function showGreeting() {
    let element = document.querySelector('.greeting');
    const date = new Date();
    const hours = date.getHours();
    const timeofDay = getTimeOfDay(hours);
    element.textContent = timeofDay == 'night' ? 'Доброй ночи,' : timeofDay == 'morning' ? 'Доброе утро' : timeofDay == 'afternoon' ? 'Добрый день,' : 'Добрый вечер,';
}

// какое время суток
function getTimeOfDay(hours) {
    hours =  Math.floor(hours/6);
    if(hours < 1)
        return 'night'
    else if(hours < 2)
        return 'morning';
    else if(hours < 3)
        return 'afternoon';
    else 
        return 'evening';
}

// в лока сторэдж
function setLocalStorage() {
    let name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

// из локал сторэдж
function getLocalStorage() {
    let name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

let randomNum;
getRandomNum();

// установка рандомного фона
function setBg() {
    const body = document.querySelector('body');
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = getTimeOfDay(hours);
    let bgNum = randomNum.toString();
    bgNum = bgNum < 10 ? '0' + bgNum.toString() : bgNum.toString();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src}`;
    }
}

// рандомный номер
function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 20) + 1).toString();
}

function getSlideNext() {
    randomNum = randomNum < 20? Number(randomNum)+1 : 1;
}

function getSlidePrev() {
    randomNum = randomNum == 1 ? 20 : Number(randomNum)-1;
}

// слайдер
function slideImg() {
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
}


// получение погды
async function getWeather() {
    // загрузка города из лс
    const city = document.querySelector('.city');
    function setLocalStorage() {
        localStorage.setItem('city', city.value);
    }
    window.addEventListener('beforeunload', setLocalStorage);
    function getLocalStorage() {
        city.value = localStorage.getItem('city');
        getWeather();
    }
    window.addEventListener('load', getLocalStorage);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=551cb3c09778bc804cc88404eee46c7e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`
    city.addEventListener('change', getWeather);
}


async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const refresh = document.querySelector('.change-quote');
    const rand = (Math.floor(Math.random() * 20) + 1);
    quote.textContent = data[rand].text;
    author.textContent = data[rand].author;
    refresh.addEventListener('click', getQuotes);
}


getQuotes();
getWeather();
showTime();