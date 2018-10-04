$(document).ready(function(){

  var DEBUG = true;
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
  var btnArr = ["geese", "horses", "giraffes", "rhinos", "unicorns", "pandas", "ducks", "whales"]; // TBD: killerWhales, humpbackWhales];

  // Functions
  // -----------------------------------

  // ==============================================
  // ==============================================
  // ==============================================
  // Main Code Starts here
  // ==============================================
  // ==============================================
  // ==============================================

  // use jquery to present initial list of buttons
  for (var i=0; i<btnArr.length;i++) {
      var initBtn = $("<button>").addClass("btn").attr("id", "btnArr" + i);
      initBtn.html(i + ": " + btnArr[i]);
      initBtn.attr("value", i);
      $("#button-section").append(initBtn);
      console.log("initBtn = ...");
      console.log(initBtn);
  };
  // Once initial buttons are presented, add event listener

  // Event Listener for user to add next Animal Type Video/GIF to the screen
  $(".btn").on("click", function() {
    if (DEBUG) {
      // Determine which if the array of buttons was clicked
      console.log("this = " + this); // = [object HTMLButtonElement]
      console.log("$(this) = " + $(this) ); // = [object HTMLButtonElement]
      console.log("Object.keys($(this) = " + Object.keys($(this)));
      console.log("Object.values($(this) = " + Object.values($(this)));
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
          console.log( response);
          console.log( response.data);

        };
  
        // Create variable for image url from the object returned from the API
        // if ( response && response.data && response.data[0].images.original.url) { // GUARD AGANST ERRORS
        //   var imageUrl = response.data[0].images.original.url;
        // };
        // for (var j=0;j<apiLimit;j++) {
            // var containsContent = response && response.data && response.data[j].images.looping.mp4;
            // if ( containsContent ) { // GUARD AGAINST ERRORS
              // var imageUrl = response.data[j].images.original.url;
        // };
        // if (CURR_DEBUG) {
        //   console.log("RESPONSE: imageUrl = " + imageUrl);
        // };


          // MAP Method with display object
  /************* Organization of dispObj ****************
  dispObj [
  {
    title: response.data[index].title,
    rating: response.data[index].rating,
    image : response.data[index].images.original.url
  }, {
    // Ditto
  }
  ];
  ************* Organization of dispObj ****************/
 var insideDispObj = [];
 function populateDispObj() {
  response.data.map(function (jifItem, index) {
    insideDispObj[index] = [{
      title: jifItem.title,  //: response.data[index].title,
      rating: jifItem.rating, //: response.data[index].rating,
      originalStill: jifItem.images.original_still.url, 
      originalGif: jifItem.images.original.url,   // : response.data[index].images.original.url
      mp4: jifItem.images.looping.mp4
    }];
  } );
  return insideDispObj;
  };




        var containsContent = response && response.data; // && response.data[0].images.looping.mp4;
        if ( containsContent ) { // GUARD AGAINST ERRORS
          var dispObj = populateDispObj();
          if (CURR_DEBUG) {
            console.log("insideDispObj = " + insideDispObj); // [object object], x4
            console.log(insideDispObj); // 4 arrays!
            console.log(insideDispObj[0][0]); // !
            console.log(insideDispObj[1][0]); // !
            console.log(insideDispObj[2][0]); // !
            console.log(insideDispObj[3][0]); // !

            console.log("insideDispObj[0][0].title = " + insideDispObj[0][0].title);
            console.log("insideDispObj[0][0].rating = " + insideDispObj[0][0].rating);
            console.log("insideDis(Obj[0][0].originalStill = " + insideDispObj[0][0].originalStill);
            console.log("insideDispObj[0][0].originalGif = " + insideDispObj[0][0].originalGif);
            console.log("insideDispObj[0][0].images.mp4 = " + insideDispObj[0][0].mp4);
          };
        };
        if (CURR_DEBUG) {
          console.log(dispObj); // 
          console.log(dispObj[0][0]); // 
          console.log(dispObj[1][0]); // 
          console.log(dispObj[2][0]); // 
          console.log(dispObj[3][0]); // 
        };

/****************** MODALS ********************/
var gifStill = insideDispObj[0][0].originalStill;
var gifImg   = insideDispObj[0][0].originalGif;
var gifTitle = insideDispObj[0][0].title;
var gifRating = insideDispObj[0][0].rating;
// var gifMp4 = insideDispObj[0][0].mp4;

var addModal = $('<div>')
    .addClass("modal")
    .attr("id", "myModal")
    .html('<span class="close">&times;</span>');
var addModalGif = $("<img>")
    .addClass("modal-content")
    .attr("id", "gif-img")
    .attr("src", gifImg) // Works
    // .attr("id", "caption");
    // .html('<img class="modal-content" id="gif-img" src=gifImg></img><div id="caption"></div>');
    addModal.append(addModalGif);

var addStill = $("<img>")
    .attr("id", "myImg")
    .attr("src", gifStill) // Works
    .attr("alt", gifTitle + " image")
    .attr("style", "width:100%;max-width:300px");
var addCaption = $("<p> id='gif-caption")
var addTitle = $("<span id'='gif-title'>").html("Title: " + gifTitle + ",&nbsp;&nbsp;" + "</span>");
var addRating = $("<span id='gif-rating'>").html("Rating:  " + gifRating.toUpperCase() + "</span>");
    addCaption.append(addTitle);
    addCaption.append(addRating);
var addGif = $("<img>")
    .attr("src", gifImg)
    .attr("alt", gifTitle + " image");
    if (CURR_DEBUG) {
      // console.log ( "addModal = ..." );
      // console.log (  addModal );
      // console.log ( "addCaption = ..." );
      // console.log (  addCaption );
      // console.log ( "gifTitle = " + gifTitle );
      // console.log ( "gifRating = " + gifRating );
      // console.log ( "addStill = ..." );
      // console.log (  addStill );
      console.log ( "addGif = ...");
      console.log (  addGif );
      console.log ( "addModalGif = ...");
      console.log (  addModalGif );
    };


    $("#gif-section")
    .html(
      $(`<div class="col-md-4">`)
      // .append($(addModal))
      .append($(addCaption))
      .append($(addStill))
      // .append($(addGif))
    );


    $("#modal-section")
      .html(
        $(`<div class="col-md-4">`)
        .append($(addModal))
        // .append($(addCaption))
        // .append($(addStill))
        // .append($(addGif))
      );





/************  END of  MODALS ********************/

    // Create var for new image tag/element on the DOM/HTML Page, Hangs out in memory until manipulated and appended
          // var animalImage = $("<img>");

  // Add attributes to the element
  // Every jQuery call takes an object and returns that object allowing for short cut form
  // animalImage.attr("src", imageUrl);
  // animalImage.attr("alt", "animal image");
  // short cut form
          // animalImage.attr("src", imageUrl).attr("alt", queryTagText + " image");
  // Place the new image at the end of the image list
          // $("#gif-section").append(animalImage);
  // };
      },
      function(error) {
        // Error Handler here, server down etc
        console.log("Got an AJAX Response Error...")
      });
  });

      // <!-- The Modal -->
      // Get the modal
      // var modal = document.getElementById('myModal');
      $("#gif-section").on("click", "#myImg", function() {
        var modal = $("#myModal");
        console.log("modal...");
        console.log(modal);
        // var modalWeWant = ["0"].currentSrc;
        // console.log("modalWeWant...");
        // console.log(modalWeWant);

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      // var img = document.getElementById('myImg');
      var img = $("#myImg");
      // console.log("img...");
      // console.log(img);

      // var modalImg = document.getElementById("img01");
      // var modalImg = $("img01");
      var modalImg = $("#myImg");
      console.log("modalImg...");
      console.log(modalImg);

      // var captionText = document.getElementById("caption");
      var captionText = $("#caption");
      // console.log("captionText...");
      // console.log(captionText);

      // Click the still image to get gif...
      // img.onclick = function(){
          // modal.style.display = "block";
          // modalWeWant.css("display", "block");
          modal.css("display", "block");
          modalImg.css("display", "block");
          // modalImg.src = this.src;
          captionText.innerHTML = this.alt;
          console.log("Saw IMG.onclick...");
      // };
      // Get the <span> element that closes the modal
      // var span = document.getElementsByClassName("close")[0];
      var span = $(".close");

      console.log("span[0]...");
      console.log(span[0]);

      // When the user clicks on <span> (x), close the modal
      span[0].onclick = function() { 
          // modal.style.display = "none";
          modal.css("display", "none");
          // modalImg.css("display", "none");
          console.log("Saw SPAN.onclick...");
        };
      })

});

