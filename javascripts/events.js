"use strict";

const data = require("./data");
const dom = require("./dom");
const time = require("./time");

// let parkMash = data.getParkMash();

const pressEnter = () => {
	// find value of serach term ...
	// ... sends value to matchingAttractions
	//matchingAttractions(searchInputValue);
};

const matchingAttractions = (searchInputValue) => {
	// loops through querried data to find any attraction names containing the search value ...
	// any corresponding attractions' area_id is passed to an array ...
		// ... sends array to highlightareas
		//highlightAreas(arrayOfMatchingIds);
};

// from getCurrentTime and getSelectedTime
const showAttractionsByTime = (chosenTime) => {
	// get attractions ...
		// ... filter attractions based on the time the user clicked
		// ... and send those results to dom
		// ... 
};

const highlightAreas = (matchingIds) => {
	// prints a border around all areas with a data-attribute corresponding to matchingIds; the array
};

const clickArea = () => {
	// when user clicks on a particular area ...
		// ... then a list of attracitons in that area is populated on the sidebar
		// ... AND finds the areaId of the clicked area ...
			// ... sends values to domStringDetails
	//dom.domStringDetails("area", parkMash, areaId);
};