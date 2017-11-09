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

// from getCurrentTime and getSelectedTime
const showAttractionsByTime = (chosenTime) => {
	// get attractions ...
		// ... filter attractions based on the time the user clicked
		// ... and send those results to dom
		// ... 
	// dom.domStringDetails(openAttractions, false);

};

const clickArea = () => {
	$(document).ready(() => {
		$(document).on("click", ".thumbnail", (function(e){
			let areaId = $(this).data("area-id");
			console.log("areaId", areaId);
			data.getAttractionsWithTypeAndMaintenanceTicketsbyAreaId(areaId).then((attractions) => {
				let openAttractions = attractionsJS.getOpenAttractions(attractions);
				let openWithUpsideDown = attractionsJS.applyUpsideDowntoAttractions(openAttractions);
				dom.domStringDetails(openWithUpsideDown, moment());

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
			data.getAttractions().then((attractions) => {
				let upsideDownAttractions = attractionsJS.applyUpsideDowntoAttractions(attractions); 
				console.log(upsideDownAttractions); 
			});
		}
	}); 
};

module.exports = {
	pressEnter, 
	testFunction,
	clickArea
};

