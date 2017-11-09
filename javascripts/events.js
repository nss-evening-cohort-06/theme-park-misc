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
	let matchingAreaIds = [];
	let matchingUpsideDownAreaIds = [];
	const regex = RegExp(`${searchInputValue}`, 'gi');
	data.getAttractions().then((fbAttractions) => {
		let attractions = attractionsJS.applyUpsideDowntoAttractions(fbAttractions);
		attractions.forEach((attraction) => {
			if (regex.test(attraction.name)) {
				matchingAreaIds.push(attraction.area_id);
				if (attraction.isUpsideDown === true) {
					matchingUpsideDownAreaIds.push(attraction.area_id);
				} 
			}
		});
		let uniqueMatchingAreaIds = [...new Set(matchingAreaIds)]; 
		let uniqueMatchingUpsideDownAreaIds = [...new Set(matchingAreaIds)];
		highlightAreas(uniqueMatchingAreaIds);
		giveAreasUpsideDownImage(uniqueMatchingUpsideDownAreaIds);
	}); 
};

const giveAreasUpsideDownImage = (matchingAreas) => {
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		matchingAreas.forEach((id) => {
			if (id === domId) {
				domElement.prepend('<img class="upside-down-img" src="./images/upside-down-img.jpg" />');
			}
		});
	});
};


const highlightAreas = (matchingIds) => {
	$('.thumbnail').each( function () {
		let domElement = $(this); 
		let domId = $(this).data("area-id");
		domElement.find('img').first().remove();  
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

