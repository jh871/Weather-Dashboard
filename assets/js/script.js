//Queryselecting existing elements 
let searchBtn = $("#search-button");
let searchInput = $("#search-input");
let sideBar = $("#search-aside");
let todayWeather = $("#today");

//initialising variables
let citySearch;
var lat;
var long;
let responseGrab; //saved response
let day; //for card number
let cardTimes; //to get weather from same interval on each card
var buttonList = $("#history");

var locationButton;

//todays weather
let cityName;
let todaysDate;
let tempKelv;
let celsius;
let wind;
let humidity;
let todayIconCode;

//forecast cards
let tempKelvFC;
let celsiusFC = (tempKelvFC - 273.15).toFixed(2);
let windFC;
let humidityFC;
let iconFC;





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


//button for location history search
let historyArray = JSON.parse(localStorage.getItem("searchLocation"));
console.log(historyArray);
makeHistoryButton();


function makeHistoryButton() {
    if (historyArray !== null) {
        buttonList.empty();
    historyArray.forEach(item => {
    //create button
    
    locationButton = $("<button>");
    locationButton.click(prevSearch);
    buttonList.append(locationButton);
    //add place name
    locationButton.text(item)
    locationButton.attr("id", (item + "Btn"));
    })};
};


//object for ls for todays weather
let locationsArr = [];

//search function:
searchBtn.on("click", runSearch, makeHistoryButton());

function runSearch(event) {
    event.preventDefault();
    citySearch = searchInput.val();
    const storageTest = localStorage.getItem("searchLocation");
    if (storageTest !== null) {
        locationsArr = JSON.parse(localStorage.getItem("searchLocation"));
    };
    locationsArr.push(searchInput.val());
    localStorage.setItem("searchLocation", JSON.stringify(locationsArr));
    geoCode();
}




//Geocoding function
function geoCode() {
    let cityCoords = "https://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"
    $.ajax({
        url: cityCoords,
        method: "GET"
    }).then(function(response) {
    // console.log(response);
    lat = (response[0].lat);
    long = (response[0].lon);

    console.log(citySearch);
        getWeather();
    });
};



//get Weather function
function getWeather(){
    console.log("next: " + lat);
    console.log("next: " + long);
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5&units=metric";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        responseGrab = response;  
        cityName = response.city.name;
        todaysDate = response.list[0].dt_txt;
        
        celsius = (response.list[0].main.temp).toFixed(1);
        todayIconCode = response.list[0].weather[0].icon;
        console.log(todayIconCode);


        wind = response.list[0].wind.speed;
        humidity =  response.list[0].main.humidity;
    showToday();
    });
};




//show Weather function
function showToday() {
    todayWeather.empty();
    console.log(responseGrab);

    const weatherToday = $("<div>")
    let todayHeader = $("<h3>");
    let todayTemp = $("<p>");
    let todayWind = $("<p>");
    let todayHumidity= $("<p>");
    let iconDiv = $("<img>");

    todayHeader.html(cityName + " ("+ today + ") ") //+ icon
    let iconURL = "https://openweathermap.org/img/wn/" + todayIconCode + "@2x.png";
    todayHeader.attr("id", "todayHeader")
    todayTemp.text("Temp: " + celsius +  "°c");
    todayWind.text("Wind speed: " + wind + "KPH")
    todayHumidity.text("Humidity: " + humidity + "%");

    weatherToday.append(todayHeader);
    weatherToday.append(todayTemp);
    weatherToday.append(todayWind);
    weatherToday.append(todayHumidity);
    todayWeather.append(weatherToday);

    iconDiv.attr("src", iconURL);
    todayHeader.append(iconDiv)

    makeCards(); 
}








function makeCards(){ 
    forecast.empty();
    day = 1;
    cardTimes = [4, 12, 20, 28, 36];

    for (let i = 0; i < cardTimes.length; i ++){
    //moment.js
        let dayX = moment().add(day, "days").format("D/MM/YYYY");
    //create card
        let forecastCard = $("<div>").addClass("card card1 col-sm-12 col-lg-2 col-md-3");
    // give card ID
        forecastCard.attr("id", "day"+(day))


//designing cards:
    let cardTitle = $("<h5>").addClass("card-title");
    let cardIcon = $("<img>");
    let cardTemp =  $("<p>").addClass("card-text");
    let cardWind =  $("<p>").addClass("card-text");
    let cardHumidity =  $("<p>").addClass("card-text");


// grab info for cards
    celsiusFC = (responseGrab.list[cardTimes[i]].main.temp).toFixed(1);
    windFC = responseGrab.list[cardTimes[i]].wind.speed;
    humidityFC =  responseGrab.list[cardTimes[i]].main.humidity;
    iconFC = responseGrab.list[cardTimes[i]].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + iconFC + "@2x.png";


//setting card content:
    cardTitle.text(dayX);
    cardIcon.attr("src", iconURL);
    cardTemp.text("Temp: " + celsiusFC + "°c");
    cardWind.text("Wind: " + windFC + "KPH");
    cardHumidity.text("Humidity: " + humidityFC + "%");
//appending cards:
    forecastCard.append(cardTitle);
    forecastCard.append(cardIcon);
    forecastCard.append(cardTemp);
    forecastCard.append(cardWind);
    forecastCard.append(cardHumidity);
    forecast.append(forecastCard);

    day++
}};


//make Buttons function
//on click of search 
// function updateButtons() {
//     buttonList.load(window.location.href + " buttonList")
// }


//function to display weather from location button -- this works ans is called correctly
function prevSearch(event) {
    event.preventDefault();
    let searchText = $(this).text();
    console.log(searchText);
    searchInput.val(searchText);
    console.log("The button works");//it does!
    runSearch(event); 
};

// CURRENT ISSUES:
// making duplicate buttons from search;
// buttons generated only on refresh and not on search
// SOMETIMES running ls twice just keeps adding buttons - need to clear div between runs??

//Next:
// - icons
// - search history title


//SCRAPBOOK:
// weatherDescr = response.list[x].weather[0].description;

    //ICONS

