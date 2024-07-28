const API_KEY = "ce5b3e8b82575862a95d040581ea8793"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        const cityContainer = document.querySelector("#weather span:first-child");
        const weatherContainer = document.querySelector("#weather span:last-child");
        const weather = data.weather[0].main;
        
        cityContainer.innerText = data.name;
        weatherContainer.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    })
}

function onGeoError(){
    alert("Can't find you.")
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);