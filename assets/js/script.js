//Queryselecting existing elements 
let searchBtn = $("#search-button");
let searchInput = $("#search-input");
let sideBar = $("#search-aside");
let todayWeather = $("#today");

//initialising variables
let citySearch;
var lat;
var long;

//todays weather
let cityName;
let todaysDate;
let tempKelv;
let celsius;
// let weatherDescr;
let wind;
let humidity;

//forecast cards
let tempKelvFC;
let celsiusFC = (tempKelvFC - 273.15).toFixed(2);
    // let weatherDescr = response.list[x].weather[0].description;
let windFC;
let humidityFC;


//5-day forecast cards:
let forecast = $("#forecast");
let fiveDayTitle = $("<h3>").addClass("fiveDayTitle");
fiveDayTitle.text("5-Day Forecast:")
todayWeather.after(fiveDayTitle);

//moment.js for dates:
let today = moment().format("D/MM/YYYY");
let day1 = moment().add(1, "days").format("D/MM/YYYY");
let day2 = moment().add(2, "days").format("D/MM/YYYY");
let day3 = moment().add(3, "days").format("D/MM/YYYY");
let day4 = moment().add(4, "days").format("D/MM/YYYY");
let day5 = moment().add(5, "days").format("D/MM/YYYY");


searchBtn.on("click", function runTest(event){
    event.preventDefault();
    geoCode(); makeButton();
});

//Geocoding function
function geoCode() {
    citySearch = searchInput.val();
    let cityCoords = "https://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"
    $.ajax({
        url: cityCoords,
        method: "GET"
    }).then(function(response) {
    // console.log(response);

    lat = (response[0].lat);
    long = (response[0].lon);

    // lat.push(latResult);
    // long.push(longResult);
    console.log(citySearch);

        getWeather()
    });
};



//get Weather function
function getWeather(){
    console.log("next: " + lat);
    console.log("next: " + long);
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        cityName = response.city.name;
        todaysDate = response.list[0].dt_txt;
        tempKelv = response.list[0].main.temp;
        celsius = (tempKelv - 273.15).toFixed(2);
        //weatherDescr = response.list[0].weather[0].description;
        wind = response.list[0].wind.speed;
        humidity =  response.list[0].main.humidity;
    showToday();
    });
};




//show Weather function
function showToday() {
    const weatherToday = $("<div>")
    let todayHeader = $("<h3>");
    let todayTemp = $("<p>");
    let todayWind = $("<p>");
    let todayHumidity= $("<p>");

    todayHeader.html(cityName + " ("+ today + ") ") //+ icon
    todayHeader.attr("id", "todayHeader")
    todayTemp.text("Temp: " + celsius +  "°c");
    todayWind.text("Wind speed: " + wind + "KPH")
    todayHumidity.text("Humidity: " + humidity + "%");

    weatherToday.append(todayHeader);
    weatherToday.append(todayTemp);
    weatherToday.append(todayWind);
    weatherToday.append(todayHumidity);
    todayWeather.append(weatherToday);

    // makeCards();
}


//make Buttons function
//on click of search 
function makeButton() {
    //create list div in #search-aside
    let buttonList = $("<div>");
    let locationButton = $("<button>");

    sideBar.append(buttonList);
    buttonList.append(locationButton);
    
    //add place name
    locationButton.text(searchInput.val())
    locationButton.attr({
        id: (searchInput.val() + "Btn"),
        click: function(){
            console.log("Hello " + searchInput.val() + "!");
        }
    })
    // locationButton.on("click", function);
}


//make cards function
const days = [1, 2, 3, 4, 5];
let cardTimes = [4, 12, 20, 28, 36];
for (i = 0; i < days.length; i++) {
    let dayX = moment().add(days[i], "days").format("D/MM/YYYY");
    let forecastCard = $("<div>").addClass("card card1 col-sm-12 col-lg-2 col-md-3");
    forecastCard.attr("id", "day"+(days[i]))


//designing cards:
        let cardTitle = $("<h5>").addClass("card-title");
        let cardIcon = $("<p>");
        let cardTemp =  $("<p>").addClass("card-text");
        let cardWind =  $("<p>").addClass("card-text");
        let cardHumidity =  $("<p>").addClass("card-text");
//setting card content:
        cardTitle.text(dayX);
        cardIcon.text("[ icon ]");
        cardTemp.text("Temp: " + celsiusFC);
        cardWind.text("Wind: " + windFC);
        cardHumidity.text("Humidity: " + humidityFC);
//appending cards:
        forecastCard.append(cardTitle);
        forecastCard.append(cardIcon);
        forecastCard.append(cardTemp);
        forecastCard.append(cardWind);
        forecastCard.append(cardHumidity);
    forecast.append(forecastCard);

};

console.log(cardTimes[0]);
console.log(cardTimes[1]);
console.log(cardTimes[2]);


//function to display weather from location button



//local storage






//SCRAPBOOK:

//choosing correct stats for each day:
// let x = 0;
// if (i = 0){
//     x = 4;
// }  
// if (i = 1){
//     x = 12;
// }
// if (i = 2){
//     x = 20;
// }
// if (i = 3){
//     x = 28;
// }
// if (i = 4){
//     x = 36;
// }
/*
    let tempKelv = response.list[x].main.temp;
    let celsiusFC = (tempKelv - 273.15).toFixed(2);
        // let weatherDescr = response.list[x].weather[0].description;
    let windFC = response.list[x].wind.speed;
    let humidityFC =  response.list[x].main.humidity;

        cardTitle.text(dayX);
        cardIcon.text("[ icon ]");
        cardTemp.text("Temp: " + celsiusFC);
        cardWind.text("Wind: " + windFC);
        cardHumidity.text("Humidity: " + humidityFC);


//need response to work in this scope
*/

/* for weather cards:
date (dd/m/yyyy)
icon
temp (c)
wind (KPH)
humidity (%)
*/
//Need to add actual content


    //ICONS
    // let iconDiv = $(".weather-icon");
    // let todayIcon = response.list[0].weather[0].icon;
    // let iconURL = "https://openweathermap.org/img/wn/" + todayIcon + "@2x.png"
    // iconDiv.html("<img src=" + iconURL + "/ >")

//could make this a domino effect of consecutive functions:
/*
search.on("click", coordsFunction());

coordsFunction() {
showWeather();
}

etc.
*/
