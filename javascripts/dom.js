"use strict";

//accepts an arrays of area name and its area ID to makes area boxes
const domStringAreas = (areaCollection) => {
	let domStringAreas = "";
  	for (let i = 0; i < areaCollection.length; i++){

  		domStringAreas +=`<div class="col-sm-6 col-md-4">`;
    	domStringAreas +=	`<div class="thumbnail" data-area-id="${areaCollection[i].id}" style="background-color:#${areaCollection[i].colorTheme}">`;
    	domStringAreas +=		`<h3 class="areaName">${areaCollection[i].name}</h3>`;
    	domStringAreas +=	`</div>`;
    	domStringAreas +=`</div>`;

	}
	printAreasToDom(domStringAreas);
};

const domStringDetails = (attractionsArray) => {
	// data.getAttractionByAreaId(detailValue);

	// create an array for the results of ^^  which holds the attractions and area array
	//detailType = either a string of "area" or "time" ...
		// ... which we'll use for if statements on what to display

	// loops on that array you just created for a dombuilder
	//I need to push the attractions into an array 

		let domStrang = "";
		for (let i = 0; i < attractionsArray.length; i++) {
				console.log("attractions array", attractionsArray[i]);
			domStrang += `<div class="row">`;
			domStrang +=   `<div class="col-sm-12">`;
			// if(detailType === "area"){
				// Area info with attraction name and type will display here...
				domStrang +=   `<p><a href="#"><strong>data-area-id="${attractionsArray[i].name}</strong></a> (${attractionsArray[i].attractionType})</p>`;
				// domStrang +=   `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;
				// domStrang +=     `<div class="panel panel-default">`;
				// domStrang +=       `<div class="panel-heading" role="tab" id="headingOne">`;
				// domStrang +=         `<h4 class="panel-title">`;
				//                        // You may/may not have to change the dot notation, just an FYI
				// domStrang +=           `${attractions[i].attractions.name} (${attractions[i].attraction_types.name})`;
				// domStrang +=         `</h4>`;
				// domStrang +=       `</div>`;
				// domStrang +=       `<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">`;
				// domStrang +=         `<div class="panel-body">`;
				// 					   // You may/may not have to change the dot notation, just an FYI
				// domStrang +=           `<p><strong>Description:</strong> ${attractions[i].areas.description}</p>`;
				// domStrang +=           `<p><strong>Times:</strong> ${attractions[i].attractions.times}</p>`;
				// domStrang +=         `</div>`;
				// domStrang +=       `</div>`;
				// domStrang +=     `</div>`;
				// domStrang +=   `</div>`;

			// } else {
				// Time will display here...
				// You may/may not have to change the dot notation, just an FYI
				// domStrang +=   `<p><strong>${attractions[i].attractions.name}</strong> ${attractions[i].areas.name}</p>`;
			// }

			domStrang +=   `</div>`;
			domStrang += `</div>`;
			domStrang += `</div>`;
		}

	// clearDom();
	printDetailsToDom(domStrang);
};

const clearDom = (divName) => {
	// clears div
		// probably only going to clear the sidebar
};


const printAreasToDom = (strang) => {
	$("#areaHolder").append(strang);
};

const printDetailsToDom = (strang) => {
	$('#sidebar-wrapper').append(strang);
};

module.exports = {domStringAreas, domStringDetails};
