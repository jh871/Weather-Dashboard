let searchBtn = $("#search-button");
let searchInput = $("#search-input");
let todayWeather = $("#today")

searchBtn.on("click", function(event) {

    event.preventDefault();
// cityName = searchInput.val

let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219&lon=-0.1276474&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    let cityName = response.city.name;

    let todaysDate = response.list[0].dt_txt;

    let tempKelv = response.list[0].main.temp;
    let celsius = (tempKelv - 273.15).toFixed(2);
    // let weatherDescr = response.list[0].weather[0].description;
    let wind = response.list[0].wind.speed;
    let humidity =  response.list[0].main.humidity;
    
    const weatherToday = $("<div>")


    let todayHeader = $("<h3>");
    todayHeader.html(cityName + " ("+ todaysDate + ") ") //+ icon
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

}
);
})

/*for hero weather:
city (date) icon
temp to fixed 2
wind
humidity

for weather cards:
date (dd/m/yyyy)
icon
temp (c)
wind (KPH)
humidity (%)
*/


    //ICONS
    // let iconDiv = $(".weather-icon");
    // let todayIcon = response.list[0].weather[0].icon;
    // let iconURL = "https://openweathermap.org/img/wn/" + todayIcon + "@2x.png"
    // iconDiv.html("<img src=" + iconURL + "/ >")




//geocoding "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"
