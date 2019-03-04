var topics = ["Naruto", "Hunter X Hunter", "My Hero Acadamia", "Sword Art Online", "Attack on Titan", "Tokyo Ghoul", "Fate/Stay Night", "No Game No Life", "Cardcaptor Sakura", "Full Metal Alchemist"]

function displayAnimeGif() {
    $("#gif-view").empty()
    var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&limit=10&api_key=2bzoaF3rvh4MyuC2guRzuaQwRPP8yLlQ"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for (var i =0; i < response.data.length; i ++){
            var gifImg = $("<img>")
            gifImg.attr("src", response.data[i].images["fixed_height"].url)
            $("#gif-view").append(gifImg)
        }
    
    });
    
  }


  function renderButtons() {


    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("anime");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttons-view").append(button);
    }
  }

  $("#add-anime").on("click", function(event) {
    event.preventDefault();
    var anime = $("#anime-input").val().trim();
    topics.push(anime);
    renderButtons();
  });

  $(document).on("click", ".anime", displayAnimeGif)

  renderButtons()