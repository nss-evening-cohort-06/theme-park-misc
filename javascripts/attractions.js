"use strict";

const moment = require('../lib/node_modules/moment/moment.js');

const upsideDownTerms = 'away, beneath, blinking, broken, camera, christmasclaws, cruiser, darkness, enchanted, evil, film, forgotten, friend, gasoline, ghost, gloomy, hawkins, hidden, hungry, indiana, invisible, labyrinth, lights, merlin, mike, monsters, neon, nighttime, party, portal, pulsate, school, sheriff, spellbinding, supernatural, thunder, underground, vintage, waffle';

//sorts maintenance times in the array so index 0 will always be the first date of maintenance
//this is used in the getAttractionsWithMaitenanceTickets promise

const sortMaintenance = (maintArr) => {
    if (maintArr.length > 0) {
        maintArr.sort((a, b) => {
            return moment(a.maintenance_date).format('x') - moment(b.maintenance_date).format('x');
        });        
    }
}; 

//takes attractions with maint object and a time
//determines if the first mainteance ticket has occured at the given time for attractions having out_of_order = true
//returns a list of attractions having out_of_order = true that need to be updated to out_of_order = false

const findFixedAttractions = (attractionsWithMaint, time) => {
    let brokenAttractions = attractionsWithMaint.filter((attraction) => {
        if (attraction.out_of_order) {
            return attraction.out_of_order === true; 
        }
    });
    let fixedAttractions = brokenAttractions.filter((attraction) => {
        if (attraction.maintenance.length > 0) {
            return moment(time).format('x') > moment(attraction.maintenance[0].maintenance_date).format('x'); 
        } 
    });
    return fixedAttractions; 
};

//takes attractions with maint object (or just attractions w/o maint obj)
//filters out attractions with out_of_order = true
//returns attraction with out_of_order = false OR no out_of_order key

const filterOutOfOrder = (attractionsWithMaint) => {
    let inOrderAttractions = attractionsWithMaint.filter((attraction) => {
        return attraction.out_of_order === false || !attraction.out_of_order; 
    });
    return inOrderAttractions; 
};

//takes attractions with maint object and a time
//filters out attractions under maintenance at the given time
//returns a list of attraction not under maintenance at the given time

const filterUnderMaintenance = (attractionsWithMaint, time) => {
    let comparisonTime = moment(time).format('x'); 
    let openAttractions = attractionsWithMaint.filter((attraction) => {
        if (!attraction.maintenance || attraction.maintenance.length === 0) {
            return true; 
        } else {
            let closedCount = 0; 
            attraction.maintenance.forEach((date) => {
                let maintenanceStart = moment(date.maintenance_date).format('x'); 
                let maintenanceEnd = moment(date.maintenance_date).add(date.maintenance_duration_hours, 'hours').format('x'); 
                if ( comparisonTime >= maintenanceStart && comparisonTime <= maintenanceEnd) {
                    closedCount++;                  
                }
            }); 
            return (closedCount > 0) ? false : true;            
        }
    });
    return openAttractions;
}; 

//Takes attractions with maint object and a time
//Calls fixed attractions to find any attractions that have been fixed at the given time
//Using the fixed attractions result, updates the attraction with maint list for attractions that need out_of_order to be false at the given time
//Filters out all out of order attractions
//Filters out all attractions under maintenance at the given time
//Returns open attractions at the given time 

const getOpenAttractions = (attractionsWithMaint, time) => {
    let fixedAttractions = findFixedAttractions(attractionsWithMaint, time);  
    fixedAttractions.forEach((fixedAttraction) => {
        attractionsWithMaint.forEach((attraction) => {
            if (fixedAttraction.id === attraction.id) {
                attraction.out_of_order = false; 
            }
        });
    }); 
    let inOrderAttractions = filterOutOfOrder(attractionsWithMaint);
    let openAttractions = filterUnderMaintenance(inOrderAttractions, time);
    return openAttractions;
}; 


const applyUpsideDowntoAttractions = (attractions) => {
    let upsideDownTermsArr = upsideDownTerms.split(", "); 
    attractions.forEach((attraction) => {
        attraction.isUpsideDown = false; 
        upsideDownTermsArr.some((term) => {
            let regexTerm = RegExp(`\\b(${term})\\b`, 'gi');
            if (regexTerm.test(attraction.description)) {
                attraction.isUpsideDown = true;
                return true; 
            }
        });
    });
    return attractions; 
};

const getUpsideDownAreas = (attractions) => {
    let attractionsWithUpsideDown = applyUpsideDowntoAttractions(attractions); 
    let upsideDownAreas = attractionsWithUpsideDown.map((attraction) => {
        if (attraction.isUpsideDown === true) {
            return attraction.area_id;
        }
    });
    let uniqueUpsideDownAreas = [...new Set(upsideDownAreas)];  
    return uniqueUpsideDownAreas; 
}; 



module.exports = {
    sortMaintenance,
    findFixedAttractions, 
    filterUnderMaintenance,
    getOpenAttractions,
    applyUpsideDowntoAttractions,
    getUpsideDownAreas
};


