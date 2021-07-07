const apiKey = "d9c0aaf84487d1a17ce6e646159d3882";
const apiKey2 = "3225e5930375639379803418c11d7cc6";
const searchBtn = document.querySelector("#search-button");

let searched = [];

function getSearched() {
    let storageSearched = localStorage.getItem("searched");

    if (storageSearched) {
        searched = JSON.parse(storageSearched)
    } 
}



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

        searched.push(searchValue);
        localStorage.setItem("searched", JSON.stringify(searched));

    prevHistory += "<br/><button class='btn btn-secondary' onClick='getCurrentWeather(\""+searchValue+"\", false)'>"+searchValue+"</button>";
        
    $("#searchHistory").html(prevHistory)
    }

    
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $("#todaysDate").text(moment().format('MMMM Do YYYY'));
            console.log(data.name);
            $("#cityHeading").text(data.name);
            console.log(data.main.temp);
            $("#temperature").text("Temp:  " + data.main.temp);
            console.log(data.wind.speed);
            $("#wind").text("Wind:  " + data.wind.speed + " MPH");
            console.log(data.main.humidity);
            $("#humidity").text("Humidity:  " + data.main.humidity + "%");
            $(".todaysWeather").css({"background-color" : "beige"});
            $("#fiveDay").css({"border-top" : "1px solid black", "padding-top" : "5px", "margin-top" : "5px"});
            console.log()
            // TODO append content to the DOM either right here or with a function
            // TODO call five day forecast and UV index
            getForecast(data.coord.lat, data.coord.lon);
        }); 

        function getForecast(lat, lon){
            console.log(lat, lon)
            let queryUrltwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apiKey2 + "&units=imperial";
    
    
            fetch(queryUrltwo)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                console.log(data.current.uvi);
                $("#uv").text("UV Index: " + data.current.uvi);
                console.log(data.daily[1].temp.morn);
                $("#date1").text(moment().add(1, 'days').calendar());
                $("#date2").text(moment().add(2, 'days').calendar());
                $("#date3").text(moment().add(3, 'days').calendar());
                $("#date4").text(moment().add(4, 'days').calendar());
                $("#date5").text(moment().add(5, 'days').calendar());

                $("#temp1").text("Temp: " + data.daily[1].temp.morn);
                $("#temp2").text("Temp: " + data.daily[2].temp.morn);
                $("#temp3").text("Temp: " + data.daily[3].temp.morn);
                $("#temp4").text("Temp: " + data.daily[4].temp.morn);
                $("#temp5").text("Temp: " + data.daily[5].temp.morn);
                
                $("#wind1").text("Wind: " + data.daily[1].wind_speed + " MPH");
                $("#wind2").text("Wind: " + data.daily[2].wind_speed + " MPH");
                $("#wind3").text("Wind: " + data.daily[3].wind_speed + " MPH");
                $("#wind4").text("Wind: " + data.daily[4].wind_speed + " MPH");
                $("#wind5").text("Wind: " + data.daily[5].wind_speed + " MPH");

                $("#humid1").text("Humidity: " + data.daily[1].humidity + "%");
                $("#humid2").text("Humidity: " + data.daily[2].humidity + "%");
                $("#humid3").text("Humidity: " + data.daily[3].humidity + "%");
                $("#humid4").text("Humidity: " + data.daily[4].humidity + "%");
                $("#humid5").text("Humidity: " + data.daily[5].humidity + "%");
            });
    
    
        }
    
}


// presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index



searchBtn.addEventListener("click", searchValue);