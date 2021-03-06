"use strict";

const moment = require('../lib/node_modules/moment/moment.js');


//accepts an arrays of area name and its area ID to makes area boxes
const domStringAreas = (areaCollection) => {
  let domStringAreas = "";

    for (let i = 0; i < areaCollection.length; i++){
      domStringAreas +=   `<div class="col-md-4">`;
      domStringAreas +=     `<div class="thumbnail" data-area-id="${areaCollection[i].id}" style="background-color:#${areaCollection[i].colorTheme}">`;
      domStringAreas +=       `<h3 class="areaName">${areaCollection[i].name}</h3>`;
      domStringAreas +=       `<p class="areaDescription">${areaCollection[i].description}</p>`;
      domStringAreas +=     `</div>`;
      domStringAreas +=   `</div>`;
  }


      domStringAreas +=  `<div class="row">`;
      domStringAreas +=    `<div class="col-sm-12">`;
      domStringAreas +=      `<footer class="footer">`;
      domStringAreas +=          `<p class="text-muted text-center">&copy; ${moment().format('YYYY')}, ${moment().format("MMMM Do")}</p>`;
      domStringAreas +=      `</footer>`;
      domStringAreas +=    `</div>`;
      domStringAreas +=`</div>`;
  printAreasToDom(domStringAreas);
};

const domStringDetails = (attractionsArray, isArea) => {

    let domStrang = "";
    domStrang += `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;

    for (let i = 0; i < attractionsArray.length; i++) {
      let upsideDownClass =  (attractionsArray[i].isUpsideDown === true) ? "upside-down" : "";
      domStrang += `<div class="panel panel-default">`;
      domStrang +=   `<div class="panel-heading" role="tab" id="heading${i}">`;
      domStrang +=     `<h4 class="panel-title ${upsideDownClass}">`;
      let heading = (isArea) ? `<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                              ${attractionsArray[i].name} (${attractionsArray[i].attractionType})</a>`
                              :
                              `<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                              ${attractionsArray[i].name} (${attractionsArray[i].areaName})</a>`;
      domStrang += heading;
      domStrang +=     `</h4>`;
      domStrang +=   `</div>`;
      domStrang +=   `<div id="collapse${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${i}">`;
      domStrang +=     `<div class="panel-body ${upsideDownClass}">`;
      domStrang +=       `<p>Description: ${attractionsArray[i].description}</p>`;
      if (isArea){
        if (attractionsArray[i].times) {
          domStrang +=       `<p>Times: ${attractionsArray[i].times.join(", ")}</p>`;
        }
          domStrang +=       `</div>`;
      } else {
        domStrang +=   `</div>`;
      }
      domStrang +=   `</div>`;
      domStrang += `</div>`;
    }
    domStrang +=  `</div>`;
  clearDom();
  printDetailsToDom(domStrang);
};


const clearDom = (divName) => {
  $(`#${divName}`).empty();
};

const printAreasToDom = (strang) => {
  $("#areaHolder").html(strang);
};

const printDetailsToDom = (strang) => {
  $('#sidebar-wrapper').html(strang);
};

module.exports = {domStringAreas, domStringDetails};
