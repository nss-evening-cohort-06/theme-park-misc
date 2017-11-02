"use strict";



const domStringAreas = () => {
	let domStringAreas = "";
	let areaCollection = [{"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}];
  	for (let i = 0; i < areaCollection.length; i++){

  		domStringAreas +=`<a href="#menu-toggle" class="menu-toggle"><div class="col-sm-6 col-md-4">`;
    	domStringAreas +=	`<div class="thumbnail" style="background-color:#${areaCollection[i].colorTheme}">`;
    	domStringAreas +=	`<h3 class="areaName">${areaCollection[i].Name}</h3>`;
    	domStringAreas +=	`<h3 class="areaId">${areaCollection[i].id}</h3>`;
    	domStringAreas +=	`<h3 class="colorTheme">${areaCollection[i].colorTheme}</h3>`;
    	domStringAreas +=`</div>`;
    	domStringAreas +=`</div></a>`;
	// accepts an arrays of area name and its area ID
	// Makes area boxes
		// with area name in the box
		// and the area id as a data attribute
	}
	printAreasToDom(domStringAreas);
	toggleMeElmo();
};

const toggleMeElmo = () => {
$(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
});
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
				// You may/may not have to change the dot notation, just an FYI
				domStrang +=   `<p><strong>${detailsArray[i].attraction.name}</strong> (${detailsArray[i].attraction_types.name})</p>`;
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


const printAreasToDom = (strang) => {
	$("#areaHolder").append(strang);
};

module.exports = {domStringAreas};
