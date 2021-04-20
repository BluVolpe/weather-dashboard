const apiKey = "d9c0aaf84487d1a17ce6e646159d3882";
const apiKey2 = "3225e5930375639379803418c11d7cc6";
const searchBtn = document.querySelector("#search-button");




function searchValue() {
    let searchValue = document.querySelector("#search-value").value;
    // TODO set up validation if form is blank
    console.log(searchValue);
    getCurrentWeather(searchValue, true);
}



function getCurrentWeather(searchValue, addToHistory) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial";

    if (addToHistory) {
        let prevHistory = $("#searchHistory").html()

    prevHistory += "<br/><button class='btn btn-secondary' onClick='getCurrentWeather(\""+searchValue+"\", false)'>"+searchValue+"</button>";
        
    $("#searchHistory").html(prevHistory)
    }

    
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data.name);
            $("#cityHeading").text(data.name);
            console.log(data.main.temp);
            $("#temperature").text("Temp:  " + data.main.temp);
            console.log(data.wind.speed);
            $("#wind").text("Wind:  " + data.wind.speed + " MPH");
            console.log(data.main.humidity);
            $("#humidity").text("Humidity:  " + data.main.humidity + "%");
            console.log()
            // TODO append content to the DOM either right here or with a function
            // TODO call five day forecast and UV index

            let queryUrltwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=current, minutely, hourly, alerts&appid=" + apiKey2 + "&units=imperial";
        });
}



        fetch(queryUrltwo)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data.daily.morn)
                
            })
// presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index



searchBtn.addEventListener("click", searchValue);