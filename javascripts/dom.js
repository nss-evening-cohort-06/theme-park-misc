"use strict";



const domStringAreas = () => {
	let domStringAreas = "";
	let areaCollection = [{"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}, {"Name": "Main Street U.S.A.", "id": 1, "colorTheme": "730217"}];
  	for (let i = 0; i < areaCollection.length; i++){

  		domStringAreas +=`<a href="#menu-toggle" class="menu-toggle"><div class="col-sm-6 col-md-4">`;
    	domStringAreas +=	`<div class="thumbnail">`;
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
	getAttractionByAreaId(detailValue);
	//detailType = either "area" or "details"
	// parkMash = entire combined park array
	// detailValue = areaID or time
		// DetailValue will essentially filter through the parkMash ...
		// ... and only give out things that match/contain the areaID or Time

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