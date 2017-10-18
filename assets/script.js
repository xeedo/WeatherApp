for (var i = 0; i < 10; i++) {
  $(".more-info").append("<p>Test</p>");
}

function getLocation() {
  if (!navigator.geolocation) {
    return null;
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  var latlng = "latlng=" + position.coords.latitude + "," + position.coords.longitude;
  var resultType = "&result_type=locality";
  var apiKey = "&key=AIzaSyACb2HlwvxHmQJ7RCxjSuQL-FGp7SH23Vg";

  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?"
    + latlng
    + resultType
    + apiKey
    , function(data) {
      $("#location").html(data.results[0].formatted_address);
  })
}
