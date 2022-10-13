function setBackground() {
    const hours = new Date().getHours();
    if (hours < 8 || hours > 19) {
        document.body.style.background = "linear-gradient(90deg, rgb(152, 152, 152), rgb(58, 58, 58))";
        document.querySelector(".container").style.color = "black";
    } else {
        document.body.style.background = "linear-gradient(90deg, rgba(221, 204, 229) 12%, rgb(118, 178, 248))";
        document.querySelector(".container").style.color = "white";
    }
}

function fetchWeatherData() {
    const url = "https://api.openweathermap.org/data/2.5/forecast?id=2761369&appid=b1483a7b0649c2a4c736913a31184730";
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => displayWeatherData(data))
        .catch((error) => console.log(error));
}

function getLocation(data) {
    return data.city.name + ", " + data.city.country;
}

function getImage(data) {
    return "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
}

function getTemperature(data) {
    return Math.round(data.list[0].main.temp - 273.15) + "°";
}

function displayWeatherData(data) {
    document.querySelector("#location").appendChild(
        document.createElement("p").appendChild(
            document.createTextNode(getLocation(data))));

    const image = document.createElement("img");
    image.src = getImage(data);
    image.width = 120;
    document.querySelector("#image").appendChild(image);

    document.querySelector("#temperature").appendChild(
        document.createElement("p").appendChild(
            document.createTextNode(getTemperature(data))));
}

setBackground();
fetchWeatherData();