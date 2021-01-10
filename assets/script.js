$(document).ready(function () {
  // Prospective steps
  // 1. find the user's city
  // 2. grab covid stats of the state
  // 3. display chart
  // 4. list covid testing sites

  // covid data by country/state
  var provinceOrState = $("<div>");
  var totalConfirmedCases = $("<div>");
  var totalDeaths = $("<div>");
  var totalRecoveredCases = $("<div>");
  var testingSiteStreet = $("<div>");
  var testingSiteCityStateZip = $("<div>");

  // click listener for the search bar
  $("#search-button").click(function () {
    var searchTerm = $("#search-term").val();
    searchTermResults = searchTerm.split(","); // clears out array as well. useful to keep in even if , isn't being used.
    var cityLoc = "https://geocode.search.hereapi.com/v1/geocode?q=" + searchTermResults[0] + "+" + searchTermResults[1] + "+US&apiKey=cm9nka7Eq7NC7YfrsKwehxVumUyYYWiARjJBuXRa484";

    $.ajax({
      url: cityLoc,
      method: "GET"
    }).then(function (cityLocation) {
      // calls the city lat lng and place it into the variables below
      console.log(cityLocation)
      var cityLat = cityLocation.items[0].position.lat
      var cityLng = cityLocation.items[0].position.lng
      // Url uses the variables above 
      testingSiteURL = "https://discover.search.hereapi.com/v1/discover?apikey=cm9nka7Eq7NC7YfrsKwehxVumUyYYWiARjJBuXRa484&q=Covid&at=" + cityLat + "," + cityLng + "&limit=3"

      $.ajax({
        url: testingSiteURL,
        method: "GET"
      }).then(function (testingSites) {

        console.log(testingSites)

        var testSites = $("#testingSites");
        /* 
        address[0] order:
        houseNumber street
        city stateCode postalCode
  
        for loop needed for all 3 items.length
        */
       for (i = 0; i < testingSites.items.lenth; i++) {
        testingSiteStreet.text(testingSites.items[i].address.houseNumber + " " +  testingSites.items[i].street);
        testingSiteCityStateZip.text(testingSites.items[i].city + ", " + testingSites.items[i].stateCode + " " + testingSites.items[i].postalCode);
        testSites.append(testingSiteStreet, testingSiteCityStateZip);
       }
        


        covidStats = "https://coronavirus-smartable.p.rapidapi.com/stats/v1/US/?rapidapi-key=60cc0bce2emsh9ba3c88eb3c4d5dp125545jsnc79365a8f484";
        $.ajax({
          url: covidStats,
          method: "GET"
        }).then(function (covidInfo) {

          var covidInfoBox = $("#covid-info");

          var arrayLength = covidInfo.stats.breakdowns.length;

          // cityLocation.items[0].position.lat
          // cityLocation.items[0].position.lng
          for (i = 0; i < arrayLength - 1; i++) {
            var state = covidInfo.stats.breakdowns[i].location.provinceOrState
            if (searchTerm === state) {

              provinceOrState.text("State: " + covidInfo.stats.breakdowns[i].location.provinceOrState);
              totalConfirmedCases.text("Confirmed cases: " + covidInfo.stats.breakdowns[i].totalConfirmedCases);
              totalDeaths.text("Total deaths: " + covidInfo.stats.breakdowns[i].totalDeaths);
              totalRecoveredCases.text("Total recovered cases: " + covidInfo.stats.breakdowns[i].totalRecoveredCases);

              var ctx = document.getElementById('myChart').getContext('2d');
              var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'pie',

                // This creates a chart from the information retrieved from the variables above and placed them into a pie chart.
                data: {
                  labels: ['Total Confirmed Cases', 'Total Recovered Cases', 'Total Deaths'],
                  datasets: [{
                    label: 'My First dataset',
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(230,80,130)', 'rgb(200,50,120)'],
                    borderColor: 'rgb(255, 99, 132)',
                    data: [covidInfo.stats.breakdowns[i].location.provinceOrState,
                    covidInfo.stats.breakdowns[i].totalDeaths,
                    covidInfo.stats.breakdowns[i].totalRecoveredCases],

                  }],
                },
                // Configuration options go here
                options: {}
              });
              // Append information obtained above to covid info box
              covidInfoBox.append(provinceOrState, totalConfirmedCases, totalDeaths, totalRecoveredCases);
              searchTerm.val("");
            }
          }
        })
      })
    });
  });

  // hamburger menu toggle variables
  var navbarToggle = $("#nav-toggle");
  var navMenu = $("#navbarBasicExample");
  var toggle = 0;
  // hamburger menu toggle
  $("#nav-toggle").click(function () {
    if (toggle === 0) {
      navbarToggle.attr("class", "navbar-burger nav-toggle is-active");
      navMenu.attr("class", "navbar-menu is-active");
      toggle++;
    }
    else {
      navbarToggle.attr("class", "navbar-burger nav-toggle");
      navMenu.attr("class", "navbar-menu");
      toggle--;
    }
  })
}) // document ready closing brackets
