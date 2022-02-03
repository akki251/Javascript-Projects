const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
  //   console.log(respData);
}

getMovies(APIURL);

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const { poster_path, title, vote_average, overview } = movie;
    movieEl.innerHTML = ` 
   <img class="movie-img"
     src="${IMGPATH + poster_path}"
     alt="${title}"
     
   />
   <div class="movie-info"> 
     <h3>${title}</h3>
     <span class="${getclassByRate(
       vote_average
     )}"> <i class="fa fa-star" aria-hidden="true"></i> ${vote_average}</span>
   </div>
   <div class="overview">
   <h4> Overview</h4>
   ${overview}</div>
 `;
    main.appendChild(movieEl);
  });
}

function getclassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

search.addEventListener("input", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
  } else {
    getMovies(APIURL);
  }
});
