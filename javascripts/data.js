"use strict";

const dom = require('./dom');
const moment = require("../lib/node_modules/moment/moment.js");


//FIREBASE

let firebaseKey = '';

const setFirebaseKey = (key) => {
    firebaseKey = key; 
};

const apiKeys = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/apiKeys.json`
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {        
        setFirebaseKey(results.firebase);
        firebase.initializeApp(results.firebase);
        return getAreas();
    }).then((areas) => {
        dom.domStringAreas(areas);
    }).catch((error) => {
        console.log(error); 
    });
};

//PROMISES 

const getAttractionsByAreaId = (areaId) => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="area_id"&equalTo=${areaId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                attractions = fbAttractions; 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsByType = (typeId) => {
    let attractions = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="type_id"&equalTo=${typeId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                attractions = fbAttractions; 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractions = () => {
    let attractions = [];  
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                attractions = fbAttractions; 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionTypes = () => {
    let attractionTypes = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json?`).then((fbAttractionTypes) => { 
            if (fbAttractionTypes !== null) {
                attractionTypes = fbAttractionTypes;
            }
            resolve(attractionTypes); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAreas = () => {
    let areas = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/areas.json`).then((fbAreas) => { 
            if (fbAreas !== null) {
                areas = fbAreas;
            }
            resolve(areas); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getParkInfo = () => {
    let info = []; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((fbInfo) => { 
            if (fbInfo !== null) {
                info = fbInfo; 
            }
            resolve(info); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsWithTypeByAreaId = (areaId) => {
    let attractions = []; 
    return new Promise ((resolve, reject) => {
        getAttractionsByAreaId(areaId).then((_attractions) => {
            attractions = _attractions; 
            return getAttractionTypes();
        }).then((types) => {
            let attractionsWithType = attractions.map((attraction) => {
                let obj = Object.assign(attraction); 
                types.forEach((type) => {
                    if (attraction.type_id == type.id) {
                        obj.attractionType = type.name;
                    }
                });
                return obj;
            });
            resolve(attractionsWithType);
        }).catch((err) => {
            reject(err);
        });
    });
};

// ON PAGE LOAD ...
const getAttractionsWithAreasByTime = () => {
  // an array of attractions with times that have 
  let attractions = [];
  // get all attractions,
  return new Promise ((resolve, reject) => {
    getAttractions().then((_attractions) => {
      attractions = _attractions;
    }).then(() => { // this will at some point need to accept a time to pass along
    // if any attraction has a time ...
        let theseAttractions = attractions.filter((attraction) => {

        if (attraction.times) {
            return true;
        } // with times
      }); //filter

      console.log("array of attraction times?", theseAttractions);

      theseAttractions.forEach((attraction) => {

        attraction.times.forEach((time) => {
            console.log("each time", Object.keys(time).length);
            attraction.times.push(moment(time, 'h:A').format("hA"));
            
             resolve(theseAttractions);
   
        });
      });
             // and if that time formatted === the selected time formatted   
            // at this point I get the array of 26 items with a time
    // resolve(theseAttractions);

   }); // 2nd then
  }); // promise 
};

// what i have left to do:

  // format Times to be similar to our times
  // make sure Times round up to the hour, keep AM/PM

  // only get attractions with times

    // narrow it down even more ...
      // ... to only ones with times matching the input

    // narrow it down even more ...
      // ... to be sure none are out of order

    // attach the area to each attraction by area_id
    // send the results to domStringDetails


module.exports = {
    getAttractions,
    getAttractionsByAreaId,
    getAttractionsByType,
    getAttractionTypes,
    getAttractionsWithTypeByAreaId,
    getAttractionsWithAreasByTime,
    getAreas,
    getParkInfo,
    retrieveKeys
};