for (var i = 0; i < 5; i++) {
  $(".more-info").append("<p>Test</p>");
}

function getLocation() {
  if (!navigator.geolocation) {
    return null;
  }
  navigator.geolocation.getCurrentPosition(getWeather);
}

function getWeather(pos) {
  var apiKey = "&APPID=d4a62cb28bf3b3eb95c6f05317b10ef9";
  position = pos.coord;

  // Show current weather
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="
    + pos.coords.latitude + "&lon=" + pos.coords.longitude
    + "&units=metric"
    + apiKey
    , function(data) {
        $("#location").html(data.name);
        $("#temp").html(data.main.temp + "&degC");
        $("#icon,img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    });

  // Show hour forecast
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat="
    + pos.coords.latitude + "&lon=" + pos.coords.longitude
    + "&units=metric"
    + "&cnt=5"
    + apiKey
    , function(data) {

      var forecasts = document.getElementsByTagName("P");

      for (var i = 0; i < forecasts.length; i++) {
        txtString = data.list[i].dt_txt.split(" ")[1].split(":")[0] + ":00";
        txtString += "<br>";
        txtString += data.list[i].main.temp + "&degC";
        forecasts[i].innerHTML = txtString;
      }
    });
}
