$(document).ready(function(){

  var DEBUG = true;
  var CURR_DEBUG = true;
  var apiLimit = 10; // Will be 10 later, Var for how many items to get per click
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
  var btnArr = ["cat", "dachsund","hamster", "geese", "horses", "giraffes", "rhinos", "unicorns", "pandas", "ducks", "whales"]; // TBD: killerWhales, humpbackWhales];

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
    var apiOffset = Math.floor(Math.random()*33); // add limit to it each time we click a button for THAT SPECIFIC item, TODO
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

      var placeStillsFunc = function ( dispObj, index ) {
        var gifStill = dispObj[index][0].originalStill;
        var gifImg   = dispObj[index][0].originalGif;
        var gifTitle = dispObj[index][0].title;
        var gifRating = dispObj[index][0].rating;
        var gifMp4 = dispObj[index][0].mp4;
        var addStill = $("<img>")
            // .attr("id", "myImg")
            .addClass("myImg")
            .attr("src", gifStill) // Works
            .attr("alt", gifTitle + " image")
            .attr("data-gif-src", gifImg)
            .attr("data-mp4-src", gifMp4)
            .attr("data-gif-title", gifTitle)
            .attr("data-gif-rating", gifRating)
            .attr("style", "width:100%;max-width:300px");
        var addCaption = $("<p> class='gif-caption");
        var addTitle = $("<span class'='gif-title'>").html("Title: " + gifTitle + ",&nbsp;&nbsp;" + "</span>");
        var addRating = $("<span class='gif-rating'>").html("Rating:  " + gifRating.toUpperCase() + "</span>");
            addCaption.append(addTitle);
            addCaption.append(addRating);
        $("#gif-section")
        // .html(
        .append(
          $(`<div class="col-md-4">`)
          // .append($(addModal))
          .append($(addCaption))
          .append($(addStill))
          // .append($(addGif))
        );
      }

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
          // MUCH BETTER TO MAKE ***ONE*** MODAL AND CHANGE IT'S CONTENTS!!!
          // addModalFunc(insideDispObj, index);
          placeStillsFunc(insideDispObj, index);
        } );
      return insideDispObj;
      };

    var containsContent = response && response.data; // && response.data[0].images.looping.mp4;
    if ( containsContent ) { // GUARD AGAINST ERRORS
      var dispObj = populateDispObj();
      if (DEBUG) {
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
    // FUNCTIONS
    // ==========================================


    /****************** MODALS ********************/
    // LOOP NOT NEEDED OR WANTED; MAKE IT A FUNCTION AND CALL INSIDE POPULATE DISP OBJ -- NOPE!...
    // MUCH BETTER TO MAKE ***ONE*** MODAL AND CHANGE IT'S CONTENTS!!!
  var addModalFunc = function( dispObj, index ) {
    // var gifStill = dispObj[index][0].originalStill;
    var gifImg   = $(dispObj).attr("data-gif-src");
    var gifMp4   = $(dispObj).attr("data-mp4-src");
    var gifTitle   = $(dispObj).attr("data-gif-title");
    var gifRating   = $(dispObj).attr("data-gif-rating");
    console.log("gifImg...");
    console.log(gifImg);
    var addTitle = $("<span class'='gif-title'>").html("Title: " + gifTitle + ",&nbsp;&nbsp;" + "</span>");
    var addRating = $("<span class='gif-rating'>").html("Rating:  " + gifRating.toUpperCase() + "</span>");

    var addModal = $('<div>')
        .addClass("modal")
        .addClass("myModal")
        .attr("id", "modalArr" + index) 
        .html('<span class="close">&times;</span>');
    var addModalGif = $("<img>")
        .addClass("modal-content")
        .data("data-modal-idx", index) 
        .attr("id", "gif-img")
        .attr("src", gifImg); // Works
        // .attr("id", "caption");
        // .html('<img class="modal-content" id="gif-img" src=gifImg></img><div id="caption"></div>');
        addModal.append(addModalGif);
        addModal.append(addTitle);
        addModal.append(addRating);
        // addStill.append(addModal);

    var addGif = $("<img>")
        .attr("src", gifImg)
        .attr("alt", gifTitle + " image");
        if (CURR_DEBUG) {
          console.log ( "addModal = ..." );
          console.log (  addModal );
          console.log ( "addModalGif = ...");
          console.log (  addModalGif );
        };
  
  
  
        $("#modal-section")
        .append(
            $(`<div class="col-md-4">`)
            .append($(addModal))
            // .append($(addCaption))
            // .append($(addStill))
            // .append($(addGif))
          );
        } ;
  /************  END of  MODALS FUNCTION ********************/

  

  // Get the modal
  $("#gif-section").on("click", ".myImg", function() {
    // var mealID = $(this).attr("data-id");
    console.log("Saw IMG.onclick...  the this's...");
    console.log(this);
    console.log($(this));
    addModalFunc($(this));

    // Not working yet...
    var modalBtnClicked = $(this).attr("data-modal-idx");
    console.log("modalBtnClicked = ", modalBtnClicked);

    var modal = $(".modal");
    var myModal = $(".myModal");
    console.log("modal...");
    console.log(modal);
    console.log("myModal...");
    console.log(myModal);

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    // var img = $(".myImg");

    var modalImg = $(".myImg");
    console.log("modalImg...");
    console.log(modalImg);

    // var captionText = $("#caption");
    var captionText = $(".gif-caption");

    // Click the still image to get gif...
    // .attr("src", gifImg); // Works on item gen, now need to detect it I think
    // modalImg.attr("src", "this.src");
    modal.css("display", "block");
    modalImg.css("display", "block");
    captionText.innerHTML = this.alt;
    console.log("Saw this.alt: ...");
    console.log(this.alt);
    console.log(this.src);

    // Get the <span> element that closes the modal
    var span = $(".close");
    var modalClose = $("#modal-section");
    console.log("span...");
    console.log(span);

    // When the user clicks on <span> (x), close the modal
    // span.onclick(".close") = function() { 
    modalClose.on("click", span, function() {
      console.log("Saw SPAN.onclick...");
      modal.css("display", "none");
      myModal.css("display", "none");
      $("#modal-section").html("");
    });
  })
});

