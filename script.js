"use strict";
let main = document.querySelector("main");
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
  // {text:"ID",link:"{id}",},
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
  { text: "Search by also known as", link: "/titles/search/akas/bog" },
  { text: "Search by Keyword", link: "/titles/search/keyword/bog" },
  { text: "Search by Title", link: `/titles/search/title/bog` },
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
  document.querySelector("main").innerHTML = "";
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
      document.querySelector("main").innerHTML = "";
      await executeAPI(result.next);
    });
  }
  main.innerHTML = htmlString;
}

function changeDropdownValue(value) {
  let [temp2, temp3] = value.split(",");
  document.querySelector("main").innerHTML = "";
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
  let newMovie = `<li class='individual-movie'>
  <a href='#' class='movie__image'>
    <img
      src='${movieImage}'
      alt='${movie.originalTitleText.text}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${movie.originalTitleText.text}</h2>
  </a>
  <p class='movie__year'>${movie.releaseYear.year}</p>
  </li>`;

  return newMovie;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("select").addEventListener("change", function () {
    document.querySelector("main").innerHTML = "";
  });
});
