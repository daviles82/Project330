"use strict";
let movieContainer = document.querySelector(".movie-container");
let nextPage = "";
let inputArea;
function executeAPI(value) {
  return new Promise((resolve, reject) => {
    const url = `https://moviesdatabase.p.rapidapi.com${value}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "da6f0caa15mshe9cf8431250a3d3p1585eejsn8360a1e755c3",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    async function getData(url, options) {
      try {
        const response = await fetch(url, options);
        var result = await response.json();
        result.page = Number(result.page);
        runPage(result);
      } catch (error) {
        reject();
        console.error(error);
      }
    }
    resolve(getData(url, options));
  });
}

const menuOptions = [
  // {text:"Seasons",link:"seasons/{seriesId}",},
  // {text:"ID",link:"/titles/bog",},
  // {text:"Random",link:"random",},
  { text: "Titles", link: "/titles" },
  // {text:"ID",link:"{id}/aka",},
  // {text:"Episode",link:"episode/{id}",},
  // {text:"Series",link:"series/{seriesId}",seondLink:"/{season}",},
  // {text:"ID",link:"{id}/ratings",},
  // {text:"X",link:"x/titles-by-ids",}, // List of Ids is required
  { text: "Upcoming", link: "/titles/x/upcoming" },
  // {text:"Series",link:"series/{seriesId}",},
  // {text:"Search",link:"INPUT",},
  { text: "Searching also known as", link: "/titles/search/akas/bog" },
  { text: "Searching Keyword", link: "/titles/search/keyword/bog" },
  { text: "Searching Title", link: `/titles/search/title/bog` },
];
// console.log(menuOptions);

const menu = document.getElementById("select");
let listMenu = [];
for (const { text, link } of menuOptions) {
  const temp = text + "," + link + "\n";
  menu.innerHTML += `<option value="${temp}">${text}</option>`;
  listMenu += [temp];
}

function runPage(result) {
  console.log(result);
  document.querySelector(".movie-container").innerHTML = "";
  let htmlString = "";
  for (let oneMovie of result.results) {
    htmlString += `${movieTemplate(oneMovie)}`;
  }
  if (result.next !== null) {
    let nextPageButton = document.getElementById("nextPage");
    let oldElement = nextPageButton;
    let newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);

    newElement.addEventListener("click", async function () {
      htmlString = "";
      document.querySelector(".movie-container").innerHTML = "";
      await executeAPI(result.next);
    });
  }
  movieContainer.innerHTML = htmlString;
}

function changeDropdownValue(value) {
  let [temp2, temp3] = value.split(",");
  document.querySelector(".movie-container").innerHTML = "";
  if (
    temp2 === "Random" ||
    temp2 === "Upcoming" ||
    temp2 === "Titles" ||
    temp2.length === 0
  ) {
    executeAPI(temp3);
  } else {
    [temp2, temp3] = value.split(",");
    document.getElementById("mySubmit").onclick = function () {
      inputArea = document.getElementById("myText").value;
      let formated = temp3.replace(/bog/g, inputArea);
      executeAPI(formated);
    };
  }
}

function movieTemplate(movie) {
  let movieImage = movie?.primaryImage?.url
    ? movie.primaryImage.url
    : "images/no-image.png";
  let yearReleased = movie?.releaseDate?.year ? movie.releaseDate.year : `Release date unknown`;
  let dayReleased = movie?.releaseDate?.day ? movie.releaseDate.day : ``;
  let monthReleased = movie?.releaseDate?.month ? movie.releaseDate.month : ``;


  let newMovie = 
  `<div class='individual-movie'>
    <img src='${movieImage}' alt='${movie.originalTitleText.text}'/>
    <div class="card-content">
      <h1>${movie.originalTitleText.text}</h1>
      <p class='movie__year'>${monthReleased}/${dayReleased}/${yearReleased}</p>

    </div>
  </div>`;

  // <a href="" class="card-button">More Info</a>

  return newMovie;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("select").addEventListener("change", function () {
    document.querySelector(".movie-container").innerHTML = "";
  });
});

