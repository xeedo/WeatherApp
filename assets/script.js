for (var i = 0; i < 5; i++) {
  $(".more-info").append("<div class=\"more-info-par\"></div>");
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
        $("#location").append(" " + data.name);
        $("#temp").append("<span> " + data.main.temp + "&degC </span>");
        $("#icon,img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    });

  // Show hour forecast
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat="
    + pos.coords.latitude + "&lon=" + pos.coords.longitude
    + "&units=metric"
    + "&cnt=5"
    + apiKey
    , function(data) {

      var forecasts = document.getElementsByClassName("more-info-par");

      for (var i = 0; i < forecasts.length; i++) {
        var temp_ico = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        txtString = "<p>" + data.list[i].dt_txt.split(" ")[1].split(":")[0] + ":00</p>";
        txtString += " ";
        txtString += "<img src=\"" + temp_ico + "\" alt=\"weather image\">";
        txtString += "<p>" + data.list[i].main.temp + "&degC</p>";
        forecasts[i].innerHTML = txtString;
      }
    });
}
