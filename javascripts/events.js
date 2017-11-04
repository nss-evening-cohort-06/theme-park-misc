"use strict";

const data = require("./data");
const dom = require("./dom");
const time = require("./time");

// let parkMash = data.getParkMash();

const pressEnter = () => {
	$("#searchBox").keypress(function (e) {
		let keyCode = e.keyCode || e.which; 
		if (keyCode === 13) {
			e.preventDefault(); 
			if (this.value !== '') {
				matchingAttractions(this.value);
			}
		}
	}); 
};

const matchingAttractions = (searchInputValue) => {
	let matchingIds = [];
	let uniqueMatchingIds = []; 
	const regex = new RegExp(`${searchInputValue}`, 'gi');
	data.getAttractions().then((attractions) => {
		attractions.forEach((attraction) => {
			if (regex.test(attraction.name)) {
				matchingIds.push(attraction.area_id); 
			}
		});
		console.log(matchingIds); 
		highlightAreas(matchingIds);
	}); 
};


const highlightAreas = (matchingIds) => {
	$('.thumbnail').removeClass("highlight"); 
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		matchingIds.forEach((id) => {
			if (id === domId) {
				domElement.addClass("highlight");
			}
		});
	});
};

// from getCurrentTime and getSelectedTime
const showAttractionsByTime = (chosenTime) => {
	// get attractions ...
		// ... filter attractions based on the time the user clicked
		// ... and send those results to dom
		// ... 
};


const clickArea = () => {
	// when user clicks on a particular area ...
		// ... then a list of attracitons in that area is populated on the sidebar
		// ... AND finds the areaId of the clicked area ...
			// ... sends values to domStringDetails
	//dom.domStringDetails("area", parkMash, areaId);
};

module.exports = {
	pressEnter
};