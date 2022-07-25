
// FetchMovies takes in an URL, a div id or class from the HTML, and a path(poster or backdrop)
 //class 'orginial_movies' = Div that holds Netflix Orginals
 //id   'trending' = DIV that holds trending Movies
 // id  'top rated' = DIV that holds top rated movies


//Call the main functions that the page is loaded
window.onload = () => {
    getOriginals()
    getTrendingNow()
    getTopRated()
}

// Helper function that  makes dynamic API calls
function fetchMovies(url, dom_element, path_type){
//Use fetch with url passsed down
fetch(url) 
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      throw new Error('something went wrong')
    }
  }) .then(data => {
    showMovies(data, dom_element, path_type)
    }).catch(error => {
    console.log(error)
  })
    //Within Fetch get the response and call showMovies() with the data, dom_element, and path type
    

}
// Function that displays the movies to the DOM
showMovies = (movies, dom_element, path_type) => {

// Create a variable that grabs id or class
let moviesEl = document.querySelector(dom_element)
console.log(movies)
//Loop Through objectt    s
for (let movie of movies.results){
    //Within the loop create an img element
    let imageElement = document.createElement('img')
    //set attribute
    imageElement.setAttribute('data-id', movie.id)
    //Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
    
    //Append the imageElement to the dom_element aelected
    moviesEl.appendChild(imageElement)
}
}
//fetchMovies('https://api.themoviedb.org/3/discover/tv?api_key=f294df1c1ebf86124a81b67b19007813', '.original__movies', 'poster_path' )

// Function that fetches Netflix Originals
function getOriginals(){
    var url =
    'https://api.themoviedb.org/3/discover/tv?api_key=f294df1c1ebf86124a81b67b19007813&with_networks=213'
    fetchMovies(url, '.original__movies', 'poster_path')
  }

// Function that fetches Trending Movies
function getTrendingNow(){
    var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=f294df1c1ebf86124a81b67b19007813'
    fetchMovies(url, '#trending', 'backdrop_path')

}

// Function that fetches Top Rated Movies
function getTopRated(){
    var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=f294df1c1ebf86124a81b67b19007813&language=en-US&page=1'
    fetchMovies(url, '#top_rated', 'backdrop_path')

}