

// geolocte api 
//  grab location
// grab covid guidelines of the state
// testing locations
// choosing testing locatioin
// be provided directions for testing location
QueryURL = "https://discover.search.hereapi.com/v1/discover?apikey=cm9nka7Eq7NC7YfrsKwehxVumUyYYWiARjJBuXRa484&q=Covid&at=30.22,-92.02&limit=3"

$.ajax({
  url: QueryURL,
  method: "GET"
}).then(function (currentDay) {
  console.log(currentDay);
});

// on click
// this.val(items[i])

QueryURL2 = "https://maps.googleapis.com/maps/api/directions/json?origin=Lafayette&destination=NewOrleans&units=imperial&key=AIzaSyDs01d715oubUTbz2ZrZSYWVH-k7N9n9xI"

$.ajax({
  url: QueryURL2,
  method: "GET",
}).then(function (currentDay) {
  currentDay.addHeader("Access-Control-Allow-Origin", "*");
  console.log(currentDay);
});

Queryurl3 = "https://api.smartable.ai/coronavirus/news/:CA"

$.ajax({
  url: Queryurl3,
  method: "GET"
}).then(function (currentDay) {
  console.log(currentDay);
});