let searchInput = document.getElementById("search");
let form = document.getElementById('form');

let dayNumber = document.getElementById("dayNumber");
let dayName = document.getElementById("dayName");
let dayMonth = document.getElementById("todayMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayIcon = document.getElementById("todayIcon");
let todayText = document.getElementById("todayText");
let todayImg1 = document.getElementById("todayImg1");
let todayImg2 = document.getElementById("todayImg2");
let todayImg3 = document.getElementById("todayImg3");

let tomorrowDay = document.getElementById("tomorrowDay");
let tomorrowIcon = document.getElementById("tomorrowIcon");
let tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp");
let tomorrowMinTemp = document.getElementById("tomorrowMinTemp");
let tomorrowText = document.getElementById("tomorrowText");

let day3Day = document.getElementById("day3Day");
let day3Icon = document.getElementById("day3Icon");
let day3MaxTemp = document.getElementById("day3MaxTemp");
let day3MinTemp = document.getElementById("day3MinTemp");
let day3Text = document.getElementById("day3Text");


navigator.geolocation.getCurrentPosition( function(position){
   console.log(position.coords);
   let currentLatitude = position.coords.latitude;
   let currentLongitude = position.coords.longitude;
   getData(`${currentLatitude},${currentLongitude}`);
})

async function getData(location){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b4476ad57aa4dab926132348241712&q=${location}&days=3&aqi=no&alerts=no`);
    let data = await response.json();
    console.log(data);
    displayData(data);
    displayForecast2(data);
    displayForecast3(data);
}
function displayData(data){
    let todayDate = data.current.last_updated;
    let data2 = new Date(todayDate);
    dayName.innerHTML= data2.toLocaleString('en-us', {weekday:'long'});
    dayNumber.innerHTML = data2.toLocaleString('en-us', {day:'2-digit'});
    dayMonth.innerHTML = data2.toLocaleString('en-us', {month:'long'});
    todayText.innerHTML = data.current.condition.text;
    todayTemp.innerHTML = data.current.temp_c;
    todayLocation.innerHTML = data.location.region;

    todayIcon.innerHTML = data.current.condition.icon;
    todayImg1.innerHTML = data.current.humidity;
    todayImg2.innerHTML = data.current.wind_kph;
    todayImg3.innerHTML = data.current.wind_dir;

}
function displayForecast2(data){
   let TomorrowDate = data.forecast.forecastday[1];
   console.log(TomorrowDate);
   
   let TomorrowDate2 = new Date(TomorrowDate.date);
   tomorrowDay.innerHTML = TomorrowDate2.toLocaleString("en-us" , {weekday:'long'});
   tomorrowIcon = TomorrowDate.day.condition.icon;
   tomorrowMaxTemp.innerHTML = TomorrowDate.day.maxtemp_c;
   tomorrowMinTemp.innerHTML = TomorrowDate.day.mintemp_c;
   tomorrowText.innerHTML = TomorrowDate.day.condition.text
}

function displayForecast3(data){
    let day3Date = data.forecast.forecastday[2];
   console.log(day3Date);
   
   let day3Date2 = new Date(day3Date.date);
   day3Day.innerHTML = day3Date2.toLocaleString("en-us" , {weekday:'long'});
   day3Icon = day3Date.day.condition.icon;
   day3MaxTemp.innerHTML = day3Date.day.maxtemp_c;
   day3MinTemp.innerHTML = day3Date.day.mintemp_c;
   day3Text.innerHTML = day3Date.day.condition.text;
} 
 

searchInput.addEventListener('input', function(e){
  let currentData = e.target.value;
  getData(currentData);
})