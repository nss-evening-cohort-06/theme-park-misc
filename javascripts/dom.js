"use strict";

const domStringAreas = (areaCollection) => {
	// accepts an arrays of area name and it's area ID
	// Makes area boxes
		// with area name in the box
		// and the area id as a data attribute


	clearDom();
	printAreasToDom();
};

const domStringDetails = (detailType, detailValue) => {
	// data.getAttractionByAreaId(detailValue);

	// create an array for the results of ^^  which holds the attractions and area array
	let detailsArray = [];
	//detailType = either a string of "area" or "time" ...
		// ... which we'll use for if statements on what to display

	// loops on that array you just created for a dombuilder
		let domStrang = "";
		for (let i = 0; i < detailsArray.length; i++) {

			domStrang += `<div class="row">`;
			domStrang +=   `<div class="col-sm-12">`;

			if(detailType === "area"){
				// Area info with attraction name and type will display here...
				domStrang +=   `<p><strong>${detailsArray[i].attraction.name}</strong> (${detailsArray[i].attraction_types.name})</p>`;
			
				domStrang +=   `<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`;
				domStrang +=     `<div class="panel panel-default">`;
				domStrang +=       `<div class="panel-heading" role="tab" id="headingOne">`;
				domStrang +=         `<h4 class="panel-title">`;
				                       // You may/may not have to change the dot notation, just an FYI
				domStrang +=           `${detailsArray[i].attraction.name} (${detailsArray[i].attraction_types.name})`;
				domStrang +=         `</h4>`;
				domStrang +=       `</div>`;
				domStrang +=       `<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">`;
				domStrang +=         `<div class="panel-body">`;
									   // You may/may not have to change the dot notation, just an FYI
				domStrang +=           `<p><strong>Description:</strong> ${detailsArray[i].areas.description}</p>`;
				domStrang +=           `<p><strong>Times:</strong> ${detailsArray[i].attractions.times}</p>`;
				domStrang +=         `</div>`;
				domStrang +=       `</div>`;
				domStrang +=     `</div>`;
				domStrang +=   `</div>`;

			} else {
				// Time will display here...
				// You may/may not have to change the dot notation, just an FYI
				domStrang +=   `<p><strong>${detailsArray[i].attraction.name}</strong> ${detailsArray[i].areas.name}</p>`;
			}

			domStrang +=   `</div>`;
			domStrang += `</div>`;

		console.log(domStrang);
		}

	clearDom();
	printDetailsToDom();
};

const clearDom = (divName) => {
	// clears div
		// probably only going to clear the sidebar
};

module.exports = {};