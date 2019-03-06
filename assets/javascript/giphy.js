$(document).ready(function () {

  //Getting Elements from HTML
  var animeButton = $(".anime")
  var gif = $(".gif")



  var topics = ["Naruto", "Hunter X Hunter", "My Hero Acadamia", "Sword Art Online", "Attack on Titan", "Tokyo Ghoul", "Fate/Stay Night", "No Game No Life", "Cardcaptor Sakura", "Full Metal Alchemist"]

  function displayAnimeGif() {
    $("#gif-view").empty()
    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&limit=10&api_key=2bzoaF3rvh4MyuC2guRzuaQwRPP8yLlQ"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        var newDiv = $("<div>")
        newDiv.addClass("gif-container animated swing")
        var gifImg = $("<img>")
        gifImg.addClass("gif")
        gifImg.attr("src", response.data[i].images["fixed_height_small_still"].url)
        gifImg.attr("data-still", response.data[i].images["fixed_height_small_still"].url)
        gifImg.attr("data-animate", response.data[i].images["fixed_height_small"].url)
        gifImg.attr("data-motion", "still")
        var rating = $("<p>")
        rating.addClass("rating")
        rating .text("Rated: " + response.data[i].rating)
        newDiv.append(gifImg , rating)
        $("#gif-view").prepend(newDiv)
      }

    });

  }


  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $("<div>");
      button.addClass("anime text animated flash");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttons-view").append(button);
    }
  }

  $("#add-anime").on("click", function (event) {
    event.preventDefault();
    var anime = $("#anime-input").val().trim();
    topics.push(anime);
    renderButtons();
  });

  $(document).on("click", ".anime", displayAnimeGif)

  renderButtons()

  function animateGif() {
    if ($(this).attr("data-motion") === "still") {
      $(this).attr("data-motion", "animate")
      $(this).attr("src", $(this).attr("data-animate"))
    }
    else if ($(this).attr("data-motion") === "animate") {
      $(this).attr("data-motion", "still")
      $(this).attr("src", $(this).attr("data-still"))
    }
  }
  $(document).on("click", ".gif", animateGif)

})