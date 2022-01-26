import './style.css';

// Get API Data

const getLocation = document.querySelector('.search_location');
const locationInput = document.querySelector('.location_input');

const ConditionSection = document.querySelector('.current-condition');

const api = 'https://api.weatherapi.com/v1/current.json?key=f85ddaedae9e4cf4a73110105222601&q=';


const displayCondition = (icon, text, degC, degF) => {
  ConditionSection.innerHTML = `
  <img class="condition_icon" src=${icon} alt="icon">
  <li class="condition_info">${text}</li>
  <li class="condition_info">${degC} °C</li>
  <li class="condition_info">${degF} °F</li>
  `;
}

const displayLocation = (city, country) => {
    const location = document.querySelectorAll('.info');

    location[0].innerHTML = city;
    location[1].innerHTML = country;
}


const getCurrentWeather = async (location) => {
    const weatherAPI = await fetch(`${api+location}&aqi=no`);
    const reponse = await weatherAPI.json()

    const text = reponse.current.condition.text;
    const icon = reponse.current.condition.icon;
    const degC = reponse.current.temp_c;
    const degF = reponse.current.temp_f;
    const city = reponse.location.name;
    const country = reponse.location.country;    

    displayCondition(icon, text, degC, degF);
    displayLocation(city, country);

};

getLocation.addEventListener('submit', (e) => {
    e.preventDefault();
    getCurrentWeather(locationInput.value);
    getLocation.reset();
});

// Display Time

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

 
    const time = document.querySelector('.time');

    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        time.innerHTML =  h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
      }
      
startTime();