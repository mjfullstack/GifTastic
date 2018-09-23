$(document).ready(function(){

  var DEBUG = false;
  var CURR_DEBUG = true;
  var apiLimit = 4; // Will be 10 later, Var for how many items to get per click
  var apiOffset = 0; // add limit to it each time we click a button for THAT SPECIFIC item, TODO
  // var apiRating = "PG"; // May introduce as an input later!

  
  var btnArr = [];
  var gifArr = [];

  // Initialize button array with something to start with
  // var origBtnList = [ 
  //   {
  //     btnArr: [],
  //     btnRating: [],
  //   }
  // ];

  
  // var rawBtns = ["horses", "giraffes", "rhinos", "unicorns", "pandas", "ducks", "whales"]; // TBD: killerWhales, humpbackWhales];
  var btnArr = ["horses", "giraffes", "rhinos", "unicorns", "pandas", "ducks", "whales"]; // TBD: killerWhales, humpbackWhales];

  // use jquery to present initial list of buttons
  for (var i=0; i<btnArr.length;i++) {
      var initBtn = $("<button>").addClass("btn").attr("id", "btnArr" + i);
      initBtn.html(i + ": " + btnArr[i]);
      initBtn.attr("value", i);
      $("#button-section").append(initBtn);
  };
  // Once initial buttons are presented, add event listener





  // Event Listener for user to add next Animal Type Video/GIF to the screen
  $(".btn").on("click", function() {
    if (DEBUG) {
      // Determine which if the array of buttons was clicked
      console.log("this = " + this); // = [object HTMLButtonElement]
      console.log("$(this) = " + $(this) ); // = [object HTMLButtonElement]
      console.log("Object.keys($(this) = " + Object.keys($(this)));
    };

    var btnClicked = $(this).attr("value");
    if (DEBUG) {
      console.log("btnClicked = " + btnClicked);
    };

    var queryTagText = btnArr[btnClicked];

    if (DEBUG) {
      console.log("queryTagText = " + queryTagText);
    };


    // Remove existing gifs IF they are there...
    $("#gif-section").html("");



    // Create a loop to get 10 of each button clicked
    // Set query string URL
      // Original Random
      // var baseURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
      // var baseURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC";
      // var paramsURL = "&limit=" + apiLimit + "&tag=" + queryTagText;
      
      // My API and using SEARCH and PG rating
      var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=qp5a3daSgVqRcOkQ5ciIscs7SqscDoBO&lang=en";
      // var paramsURL = "&q=" + queryTagText + "&limit=" + apiLimit + "&offset=" + apiOffset + "&rating=" + apiRating;
      var paramsURL = "&q=" + queryTagText + "&limit=" + apiLimit + "&offset=" + apiOffset;

      
      var queryURL = baseURL + paramsURL;
      if (CURR_DEBUG) {
        console.log("queryURL = " + queryURL);
      };
    // Make call to API. $ equals a call to an object, in this case its jquery and a ajax function
    $.ajax({ 
      url: queryURL,
      method: "GET"
    })

    // Once JSON object arrives, do the following... ALSO, there NEEDS TO BE AN ERROR HANDLER
      .then(function(response) {
        // JSON.parse(response);
        if (CURR_DEBUG) {
          console.log("response = " + response);
        };
  
      // Create variable for image url from the object returned from the API
      // if ( response && response.data && response.data[0].images.original.url) { // GUARD AGANST ERRORS
      //   var imageUrl = response.data[0].images.original.url;
      // };
      for (var j=0;j<apiLimit;j++) {
        if ( response && response.data && response.data[j].images.looping.mp4) { // GUARD AGAINST ERRORS
          var imageUrl = response.data[j].images.original.url;
        };
        if (CURR_DEBUG) {
          console.log("RESPONSE: imageUrl = " + imageUrl);
        };


          // Create var for new image tag/element on the DOM/HTML Page, Hangs out in memory until manipulated and appended
          var animalImage = $("<img>");

          // Add attributes to the element
          // Every jQuery call takes an object and returns that object allowing for short cut form
          // animalImage.attr("src", imageUrl);
          // animalImage.attr("alt", "animal image");
        // short cut form
          animalImage.attr("src", imageUrl).attr("alt", queryTagText + " image");
          // Place the new image at the end of the image list
          $("#gif-section").append(animalImage);
        };
      },
      function(error) {
        // Error Handler here, server down etc
      });
  });
});
