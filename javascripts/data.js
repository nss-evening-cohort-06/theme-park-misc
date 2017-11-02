"use strict";

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
    }).catch((error) => {
        console.log(error); 
    });
};


//PROMISES 

const getAttractionsByAreaId = (areaId) => {
    let attractions = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="area_id"&equalTo=${areaId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                Object.keys(fbAttractions).forEach((key) => {
                    fbAttractions[key].id = key;
                    attractions.push(fbAttractions[key]);
                }); 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsByType = (typeId) => {
    let attractions = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="type_id"&equalTo=${typeId}`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                Object.keys(fbAttractions).forEach((key) => {
                    fbAttractions[key].id = key;
                    attractions.push(fbAttractions[key]);
                }); 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionsByName = (name) => {
    let attractions = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?orderBy="name"&equalTo="${name}"`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                Object.keys(fbAttractions).forEach((key) => {
                    fbAttractions[key].id = key;
                    attractions.push(fbAttractions[key]);
                }); 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractions = () => {
    let attractions = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attractions.json?`).then((fbAttractions) => { 
            if (fbAttractions !== null) {
                Object.keys(fbAttractions).forEach((key) => {
                    fbAttractions[key].id = key;
                    attractions.push(fbAttractions[key]);
                }); 
            }
            resolve(attractions); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

const getAttractionTypes = () => {
    let attractionTypes = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/attraction_types.json?`).then((fbAttractionTypes) => { 
            if (fbAttractionTypes !== null) {
                Object.keys(fbAttractionTypes).forEach((key) => {
                    fbAttractionTypes[key].id = key;
                    attractionTypes.push(fbAttractionTypes[key]);
                }); 
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
        $.ajax(`${firebaseKey.databaseURL}/areas.json?`).then((fbAreas) => { 
            if (fbAreas !== null) {
                Object.keys(fbAreas).forEach((key) => {
                    fbAreas[key].id = key;
                    areas.push(fbAreas[key]);
                }); 
            }
            resolve(areas); 
        }).catch((err) => {
            reject(err); 
        });
    });
};


const getParkInfo = () => {
    let info = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        $.ajax(`${firebaseKey.databaseURL}/park-info.json`).then((fbInfo) => { 
            if (fbInfo !== null) {
                Object.keys(fbInfo).forEach((key) => {
                    fbInfo[key].id = key;
                    info.push(fbInfo[key]);
                }); 
            }
            resolve(info); 
        }).catch((err) => {
            reject(err); 
        });
    });
};

module.exports = {
	getAttractionsByAreaId,
	getAreas,
	getAttractions,
	getAttractionTypes,
	retrieveKeys
};