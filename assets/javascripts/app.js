
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

function displayMovieInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data
    $("#showMovie").empty()
    for (var i = 0; i < results.length; i++) {
      var imageTag = $("<img>")
      imageTag.attr("src", results[i].images.fixed_height_still.url)
      imageTag.attr("data-still",results[i].images.fixed_height_still.url)
      imageTag.attr("data-animate",results[i].images.fixed_height.url)
      imageTag.attr("data-state","still")
      imageTag.addClass("gif")
      $("#showMovie").append(imageTag)
    }
  });

}


function renderButtons() {


  $("#buttons-view").empty();

  for (var i = 0; i < movies.length; i++) {


    var a = $("<button>");

    a.addClass("movie");

    a.attr("data-name", movies[i]);

    a.text(movies[i]);

    $("#buttons-view").append(a);
  }
}

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();

  movies.push(movie);

  renderButtons();
});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();

$(document).on("click",".gif", function() {
 
  var state  = $(this).attr("data-state")
  //console.log(state)
  if(state === "still"){
    var animate = $(this).attr("data-animate")
    $(this).attr("src",animate )
    $(this).attr("data-state","animate" )
  }
  else if (state === "animate")
  {
    var dateState = $(this).attr("data-still")
    $(this).attr("src",dateState )
    $(this).attr("data-state","still" )
  }
});