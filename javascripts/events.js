"use strict";

const data = require("./data");
const dom = require("./dom");
const time = require("./time");
const attractionsJS = require('./attractions'); 
const moment = require('../lib/node_modules/moment/moment.js');

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
let something = [];
// from getCurrentTime and getSelectedTime
const showAttractionsByTime = () => {
// only prints things when both fields have been filled in,

	// get attractions ...
		$(document).ready(time.getCurrentTime());
			// $(document).ready(dom.domStringDetails("time", time.getCurrentTime()));
		$("#datepicker").blur(() => {
			userSelectedDateAndTime = time.getSelectedDay();
			if (userSelectedDateAndTime != undefined) {
				// console.log("I just need all things that have a time tied to it", data.getAttractionsWithAreasByTime(userSelectedDateAndTime));
				// do something with the time and date
				console.log("here!");
				data.getAttractionsWithAreasByTime(userSelectedDateAndTime);
				something = data.getAttractionsSortedByTime();
					console.log("user selected goodies", something);
			}
					dom.domStringDetails(something, "time");

		});

		$(".dropdown-menu").click((e) => {
			userSelectedDateAndTime = time.getSelectedTime(e);
			if (userSelectedDateAndTime != undefined) {
				console.log("here!");
				// console.log("I just need all things that have a time tied to it", data.getAttractionsWithAreasByTime(userSelectedDateAndTime));
				// do something with the time and date
				data.getAttractionsWithAreasByTime(userSelectedDateAndTime);
				something = data.getAttractionsSortedByTime();
					console.log("user selected goodies", something);
				
				// console.log("user elected goodies", userSelectedDateAndTime);				
			}
				dom.domStringDetails(something, "time");

 });
};
		// ... and send those results to dom
		// ... 
	// dom.domStringDetails(openAttractions, false);

const clickArea = () => {
	$(document).ready(() => {
		$(document).on("click", ".thumbnail", (function(e){
			let areaId = $(this).data("area-id");
			console.log("areaId", areaId);
			data.getAttractionsWithTypeAndMaintenanceTicketsbyAreaId(areaId).then((attractions) => {
				console.log("attractions", attractions);
				let openAttractions = attractionsJS.getOpenAttractions(attractions);
				console.log("open attractions", openAttractions);
				dom.domStringDetails(openAttractions, true);
			}).catch((err) => {
				console.log(err);
			});
			console.log("listening for click on .thumbnail");
		}));
	});
};


// 	//do something to get the clicked thumbnail data-area-id (e.)
// 	// when user clicks on a particular area ...
// 		// ... then a list of attracitons in that area is populated on the sidebar
// 		// ... AND finds the areaId of the clicked area ...
// 			// ... sends values to domStringDetails
// 	//dom.domStringDetails("area", parkMash, areaId);
// };


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

const init = () => {
	showAttractionsByTime();
	clickArea();
	pressEnter();
};


module.exports = {
	init,
	testFunction,
};

