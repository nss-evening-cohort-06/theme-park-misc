"use strict";

const moment = require('../lib/node_modules/moment/moment.js');

//accepts an arrays of area name and its area ID to makes area boxes
const domStringAreas = (areaCollection) => {
	let domStringAreas = "";
  	for (let i = 0; i < areaCollection.length; i++){

  		domStringAreas +=`<div class="col-sm-6 col-md-4">`;
    	domStringAreas +=	`<div class="thumbnail" data-area-id="${areaCollection[i].id}" style="background-color:#${areaCollection[i].colorTheme}">`;
    	domStringAreas +=		`<h3 class="areaName">${areaCollection[i].name}</h3>`;
    	domStringAreas +=	`</div>`;
    	domStringAreas +=`</div>`;
    	domStringAreas +=`</a></div>`;
	}
		domStringAreas +=`<div class="container">`;
		domStringAreas +=  `<div class="row">`;
		domStringAreas +=    `<div class="col-sm-12">`;
		domStringAreas +=      `<footer class="footer">`;
    	domStringAreas +=        `<div class="container">`;
    	domStringAreas +=          `<p class="text-muted">&copy; ${moment().format('YYYY')}, ${moment().format("MMMM Do")}</p>`;
    	domStringAreas +=        `</div>`;
    	domStringAreas +=      `</footer>`;
    	domStringAreas +=    `</div>`;
    	domStringAreas +=  `</div>`;
    	domStringAreas +=`</div>`;
	printAreasToDom(domStringAreas);
};

const domStringDetails = (attractionsArray) => {
		let domStrang = "";
		domStrang += `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;
		for (let i = 0; i < attractionsArray.length; i++) {
			domStrang +=	`<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    				<div class="panel panel-default">
      					<div class="panel-heading" role="tab" id="heading${i}">
        					<h4 class="panel-title">
        					<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
          						${attractionsArray[i].name} (${attractionsArray[i].attractionType})
        					</a>
        					</h4>
      					</div>
    						<div id="collapse${i}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${i}">
      							<div class="panel-body">
        						<p>Description: ${attractionsArray[i].description}</p>
        						<p>Times: ${attractionsArray[i].times}</p>
      						</div>
    					</div>
  					</div>
				</div>
			</div>`;
		}
		domStrang +=	`</div>`;
	clearDom();
	printDetailsToDom(domStrang);
};

const clearDom = (divName) => {
  $(`#${divName}`).empty();
};

const printAreasToDom = (strang) => {
	$("#areaHolder").append(strang);
};

const printDetailsToDom = (strang) => {
	$('#sidebar-wrapper').html(strang);
};

module.exports = {domStringAreas, domStringDetails};
