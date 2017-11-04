"use strict";

const data = require("./data");
// const dom = require("./dom");
const time = require("./time");


// // let parkMash = data.getParkMash();


const pressEnter = () => {
	$("#searchBox").keypress(function (e) {
		let keyCode = e.keyCode || e.which; 
		if (keyCode === 13) {
			e.preventDefault();
			$('.thumbnail').removeClass("area-border");  
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
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		matchingIds.forEach((id) => {
			if (id === domId) {
				domElement.addClass("area-border");
			}
		});
	});
};

// from getCurrentTime and getSelectedTime
const showAttractionsByTime = () => {

	// get attractions ...
		$(document).ready(time.getCurrentTime());
			// $(document).ready(dom.domStringDetails("time", time.getCurrentTime()));

		// ON PAGE LOAD ...
		// ... filter attractions based on the time the user clicked
			$(".dropdown-menu").click((e) => {
				time.getSelectedTime(e);

 });
		// ... and send those results to dom
		// ... 
};

const init = () => {
	showAttractionsByTime();
	pressEnter();
};

module.exports = {init};
