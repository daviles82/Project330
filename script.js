"use strict";

let inputArea;
function executeAPI(value) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/${value}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'da6f0caa15mshe9cf8431250a3d3p1585eejsn8360a1e755c3',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  async function getData(url, options) {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  getData(url, options);
}

const menuOptions = [
  // {text:"Seasons",link:"seasons/{seriesId}",},
  // {text:"ID",link:"{id}",},
  // {text:"Random",link:"random",},
  {text:"Titles",link:"",},
  // {text:"ID",link:"{id}/aka",},
  // {text:"Episode",link:"episode/{id}",},
  // {text:"Series",link:"series/{seriesId}",seondLink:"/{season}",},
  // {text:"ID",link:"{id}/ratings",},
  // {text:"X",link:"x/titles-by-ids",}, // List of Ids is required
  {text:"Upcoming",link:"x/upcoming",},
  // {text:"Series",link:"series/{seriesId}",},
  // {text:"Search",link:"INPUT",},
  {text:"Search by also known as",link:"search/akas/bog",},
  {text:"Search by Keyword",link:"search/keyword/bog",},
  {text:"Search by Title",link:`search/title/bog`,},
];
// console.log(menuOptions);

const menu = document.getElementById("select");
let listMenu = []
for (const { text, link } of menuOptions) {
  const temp = text + ',' + link + '\n'
  menu.innerHTML += `<option value="${temp}">${text}</option>`;
  listMenu += [temp]
}

//Test Code
// const commonValues = {
//   Upcoming: ["batman vs penquins", "attack of the killer tomatoes"],
//   Rating: ["one star", "two star"],
//   Popularity: ["star farts", "troll fleet"],
// };

function changeDropdownValue(value) {
  let [temp2,temp3] = value.split(",")
  if (
    temp2 === "Random" ||
    temp2 === "Upcoming" ||
    temp2 === "Titles" ||
    temp2.length === 0
  ) {
    executeAPI(temp3)
    // document.getElementById("secondSelect").innerHTML = "<option></option>";
  } else {
    [temp2,temp3] = value.split(",")

    var inputArea;
    document.getElementById("mySubmit").onclick = function(){
      inputArea = document.getElementById("myText").value;
      let formated = temp3.replace(/bog/g, inputArea)
      executeAPI(formated)
    }
    // let secondListMenu = listMenu.split("\n");
    // console.log(listMenu);
    // for (let categoryID of secondListMenu) {
      // let [temp4,temp5] = categoryID.split(",")

      // console.log(categoryID);
      // secondMenu.innerHTML += `<option value="${categoryID}">${categoryID}</option>`;
    }

  }
// }


