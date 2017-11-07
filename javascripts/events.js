"use strict";

const data = require("./data");
// const dom = require("./dom");
const time = require("./time");
const attractionsJS = require('./attractions'); 

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
let userSelectedDateAndTime;
// from getCurrentTime and getSelectedTime
const showAttractionsByTime = () => {
// only prints things when both fields have been filled in,

	// get attractions ...
		$(document).ready(time.getCurrentTime());
			// $(document).ready(dom.domStringDetails("time", time.getCurrentTime()));
		$("#datepicker").blur(() => {
			userSelectedDateAndTime = time.getSelectedDay();
			if (userSelectedDateAndTime != undefined) {
				console.log("I just need all things that have a time tied to it", data.getAttractionsWithAreasByTime());
				// do something with the time and date
				console.log("user elected goodies", userSelectedDateAndTime);				
			}

		});

		$(".dropdown-menu").click((e) => {
			userSelectedDateAndTime = time.getSelectedTime(e);
			if (userSelectedDateAndTime != undefined) {
				console.log("I just need all things that have a time tied to it", data.getAttractionsWithAreasByTime());
				// do something with the time and date
				console.log("user elected goodies", userSelectedDateAndTime);				
			}

 });
		// ON PAGE LOAD ...
			// get all attractions,
			// if any attraction has a time
			// and if that time === the selected time
				// save that to a new array
					// and send that out to domStringDetails("time", )
		// ... filter attractions based on the time the user clicked
};



const init = () => {
	showAttractionsByTime();
	pressEnter();
	pressEnter();
};

//***use this to test functions requiring ajax calls - just press "t" in the search box and this with execute**** 
const testFunction = () => {
	$("#searchBox").keypress(function (e) {
		let keyCode = e.keyCode || e.which; 
		if (keyCode === 116) {
			data.getAttractionsWithTypeAndMaintenanceTicketsbyAreaId(1).then((attractions) => {
				console.log(attractions); 
			});
		}
	}); 
};

module.exports = {init, testFunction};
