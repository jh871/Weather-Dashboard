let searchBtn = $("#search-button");
let searchInput = $("#search-input");
let sideBar = $("#search-aside");
let todayWeather = $("#today");
let today = moment().format("D/MM/YYYY");


let day1 = moment().add(1, "days").format("D/MM/YYYY");
let day2 = moment().add(2, "days").format("D/MM/YYYY");
let day3 = moment().add(3, "days").format("D/MM/YYYY");
let day4 = moment().add(4, "days").format("D/MM/YYYY");
let day5 = moment().add(5, "days").format("D/MM/YYYY");
//push these to array and move through them

//could make this a domino effect of consecutive functions:
/*
search.on("click", coordsFunction());

coordsFunction() {
showWeather();
}

etc.
*/

//end of first ajax, start second:
searchBtn.on("click", function(event) {
    event.preventDefault();
    let citySearch = searchInput.val();
    let lat = 0;
    let long = 0;
//geocoding 
    let cityCoords = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"
    $.ajax({
        url: cityCoords,
        method: "GET"
    }).then(function(response) {
    // console.log(response);
    lat = response[0].lat;
    long = response[0].lon;
    // console.log(lat);
    // console.log(long);
    // cityName = searchInput.val
        
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        // console.log(citySearch);
        let cityName = response.city.name;
    
        let todaysDate = response.list[0].dt_txt;
    
        let tempKelv = response.list[0].main.temp;
        let celsius = (tempKelv - 273.15).toFixed(2);
        // let weatherDescr = response.list[0].weather[0].description;
        let wind = response.list[0].wind.speed;
        let humidity =  response.list[0].main.humidity;
        
        const weatherToday = $("<div>")
            let todayHeader = $("<h3>");
            todayHeader.html(cityName + " ("+ today + ") ") //+ icon
            weatherToday.append(todayHeader);
            todayHeader.attr("id", "todayHeader")
    
            let todayTemp = $("<p>");
            todayTemp.text("Temp: " + celsius +  "°c");
            weatherToday.append(todayTemp);
    
            let todayWind = $("<p>");
            todayWind.text("Wind speed: " + wind + "KPH");
            weatherToday.append(todayWind);
    
            let todayHumidity= $("<p>");
            todayHumidity.text("Humidity: " + humidity + "%");
            weatherToday.append(todayHumidity);
    
        todayWeather.append(weatherToday);
        });
        
    makeButton();
    })
})


//on click of search 
function makeButton() {

//create list in #search-aside
    let buttonList = $("<div>");
    sideBar.append(buttonList);

    //li as button
    let locationButton = $("<button>")
    buttonList.append(locationButton);

        //add place name
    locationButton.text(searchInput.val())
    locationButton.attr({
        id: (searchInput.val() + "Btn"),
        click: function(){
            console.log("Hello " + searchInput.val() + "!");
        }
    })

    //button on-click will trigger main search ajax function
}







let forecast = $("#forecast");
let fiveDayTitle = $("<h3>").addClass("fiveDayTitle");
fiveDayTitle.text("5-Day Forecast:")
todayWeather.after(fiveDayTitle);

//currrently displays this part:
//need this on Click but okay!
const days = [1, 2, 3, 4, 5]
for (i = 0; i < days.length; i++) {
    let forecastCard = $("<div>").addClass("card").addClass("col-sm-12").addClass("col-lg-2").addClass("col-md-3");
        let cardTitle = $("<h5>").addClass("card-title");
        let cardIcon = $("<p>");
        let cardTemp =  $("<p>").addClass("card-text"); 
        let cardWind =  $("<p>").addClass("card-text");
        let cardHumidity =  $("<p>").addClass("card-text");
        cardTitle.text("Date");
        cardIcon.text("[ icon ]");
        cardTemp.text("Temp: ");
        cardWind.text("Wind: ");
        cardHumidity.text("Humidity: ");
        forecastCard.append(cardTitle);
        forecastCard.append(cardIcon);
        forecastCard.append(cardTemp);
        forecastCard.append(cardWind);
        forecastCard.append(cardHumidity);
    forecast.append(forecastCard);
}

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




