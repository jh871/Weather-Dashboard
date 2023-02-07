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
    // console.log();

    let cityName = response.city.name;

    // console.log(response.list[0].dt_txt);

    let todaysDate = response.list[0].dt_txt;

    // console.log(response.list[0].main.temp);

    let tempKelv = response.list[0].main.temp;
    let celsius = (tempKelv - 273.15).toFixed(2);
    // console.log(celsius);

    // console.log(response.list[0].weather[0].description);
    let weatherDescr = response.list[0].weather[0].description;

    let wind = response.list[0].wind.speed;
    let humidity =  response.list[0].main.humidity;


    const weatherToday = $("<div>")

    weatherToday.text("Today's weather: " + cityName + " ("+ todaysDate + ") "  + "\nweather: "
    +  weatherDescr + "\ntemp: " 
    + celsius + "°c" + "\nwind speed: "
    + wind + "KPH" + "\nhumidity: "
    + humidity + "%"
    );

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



//geocoding "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=24b0bccae4dbb8bd3aef5fad1d1c5cf5"
