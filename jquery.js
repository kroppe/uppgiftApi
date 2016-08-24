var urlForecast = "https://api.forecast.io/forecast/"
var keyForecast = "6c1a57279abdce881956f51b574356f5/"
var land = "Sverige"


function tempOnAddress(lat,lng) {

  return $.getJSON(urlForecast + keyForecast + lat + "," + lng + "?callback=?", function(dataFore) {

  });
};

$("#address").click(function() {
  $("#address").val("");
})
$("#stad").click(function() {
  $("#stad").val("");
})

$("#get").click(function() {
  var address = $("#address").val();
  var stad = $("#stad").val();

  lat = [];
  lng = [];

  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+stad+land, function(data, textStatus, jqXHR) {



          for(i in data.results) {

            lat.push(data.results[i].geometry.location.lat);
            lng.push(data.results[i].geometry.location.lng);

          }

          var r = 0;

          function forecastLoop () {
             setTimeout(function () {


                if (r < lat.length) {

                  $.when(tempOnAddress(lat[r], lng[r])).done(function (tp) {
                    console.log(r);
                        $('#answers').append('<p>'+ data.results[r].formatted_address+ '</p>');
                        $('#answers').append('<p>'+ data.results[i].geometry.location.lat+ '</p>');
                        $('#answers').append('<p>'+ data.results[i].geometry.location.lng+ '</p>');
                        var farenheitToCelsium = Math.round(((tp.currently.temperature - 32) * 5)/9);
                        $('#answers').append('<p>'+ farenheitToCelsium+'  °C</p>');



                        r++
                      });


                   forecastLoop();

                }
             }, 500)
          }

          forecastLoop();

  });



});
