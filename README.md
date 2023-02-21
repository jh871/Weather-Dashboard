# Weather Dashboard

## Description

This application is a weather dashboard that allows a user to search a placename and will return the current weather for that location as well as a forecast for the next 5 days. The user's searches are saved as buttons which can then be used to take another look at previously viewed weather by location.


----------

## Usage

This application can be run in any browser and will work on mobile. A user can search a location to see the weather by typing into the search box and clicking search or pressing 'enter'. The forecast includes temperature, wind speed, humidity and an icon representation of the weather. Each search generates a button with the name of that location that when clicked will re-display the corresponding weather. The user can clear their search history by clicking the 'clear' button which will remove all location buttons. 


----------

## Development

This application runs on JavaScript. The page was built in HTML and styled in CSS. JQuery was used for dynamic elements and the ajax API calls. 

The displayed weather is retrieved using two OpenWeather APIs: the 5 Day Forecast API (https://openweathermap.org/forecast5) and the Geocoding API (https://openweathermap.org/api/geocoding-api) for the location name search, which converts a place name into latitude and longitude coordinates. 

The date for today and the forecast cards is generated using moment.js (https://momentjs.com/).  

The icons used on the page were from Font Awesome (https://fontawesome.com/search?m=free&o=r). 

Local storage is used to store searched place names in an array to generate the 'recent searches' buttons that display previous weather. These work by re-running the API calls. If a user searches the same place twice in the search bar it will generate two identical buttons.


----------

## My experience developing this application

I was able to build the dynamic elements and get the APIs working relatively quickly for this. The main challenge for me was linking the generated buttons to local storage. Issues with this included the button press generating an identical button because it was pushing itself to local storage, and the page generating blank buttons on refresh because the generate button function would run even if local storage was null. Additionally for a little while the first search on a fresh page with empty local storage wouldn't generate the button for that search. These issues were all addressed by adding separate functions to the buttons and reconsidering which array populated/used when.

Another issue I found was styling the buttons that were generated from previous search history. Depending on classes added to them on generation, they were either plain or transparent, and would accept styling on hover, but I was not able to change the colour or shape of them manually; On the console it looked like pre-existing custom styling was overwriting my CSS even when I used the "!important" property.



----------

## License

This application has an MIT license which can be found in the repo.


----------

## Links


### Link to deployed application:

https://jh871.github.io/Weather-Dashboard/



### Link to GitHub repo:


https://github.com/jh871/Weather-Dashboard

----------

## Screenshot of deployed application:
![Screenshot showing 5-day forecast for Manchester](/assets/images/Screenshot_Weather-Dashboard_JHull.png)
