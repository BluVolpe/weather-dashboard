<<<<<<< HEAD
const apiKey = "d9c0aaf84487d1a17ce6e646159d3882";
const searchBtn = document.querySelector("#search-button")




function searchValue() {
    let searchValue = document.querySelector("#search-value").value;
    // TODO set up validation if form is blank
    console.log(searchValue);
    getCurrentWeather(searchValue);
}

function getCurrentWeather(searchValue) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey;

    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log(data);
            // TODO append content to the DOM either right here or with a function
            // TODO call five day forecast and UV index
        })
}



=======
const apiKey = "d9c0aaf84487d1a17ce6e646159d3882";
const searchBtn = document.querySelector("#search-button")




function searchValue() {
    let searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
}



>>>>>>> b88f6d7b7e0684aa4dd569e6a35d6284fac4999a
searchBtn.addEventListener("click", searchValue);