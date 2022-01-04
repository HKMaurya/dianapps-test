/*******************************************************************************
 * Common Helper
 ******************************************************************************/
'use strict';
const mongoose = require('mongoose');
const fs = require('fs');

const toLowerCase = (data) => {
  return data ? data.toLowerCase() : '';
};

const currentLanguage = (data) => {
  return data && (data == 'en' || data == 'en-en,en;q=0.9') ? 'En' : 'It';
};

const searchData = (data) => {
  return data ? new RegExp(data, 'i') : '';
};

const removeEmptySpace = (data) => {
  return data ? data.trim() : '';
};

const isObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/) ? true : false;
};

const stringToObjectId = (id) => {
  return mongoose.Types.ObjectId(id);
};

const getCurrentLanguage = (data) => {
  return currentLanguage(checkData(removeEmptySpace(data)));
};

const splitStringByKey = (data, key) => {
  return data.split(key)
}

const joinStringByKey = (data, key) => {
  return data.join(key)
}

const getSlugData = (data) => {
  return data ? joinStringByKey(splitStringByKey(toLowerCase(removeEmptySpace(data)), " "), '-') : '';
};

const searchUserData = (data) => {
  return searchData(toLowerCase(data));
};

const getObjectId = (data) => {
  let id = removeEmptySpace(data);
  return isObjectId(id) ? stringToObjectId(id) : '';
};

const isObjectIds = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/) ? true : false;
};

const removeFileFromFolder = (image, path) => {
  fs.unlink(path + image, (err) => { if(err) console.log(err, 'unable to unlink file from folder')});
}

const stringToObjectIds = (id) => {
  return mongoose.Types.ObjectId(id);
};

const checkData = (data) => {
  if (data == '' || data == 'false' || data == false || data == 'null' || data == null || data == 'undefined' || data == undefined || data == '0' || data == 0) return '';
  return data;
};

const removeFalseValueFromArray = (data) => {
  return data.filter(x => Boolean(x) == true);
};

const getFileExtension = (filename) => {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
};

const stringToNumber = (data) => {
  return data && !isNaN(data) ? parseFloat(data) : 0;
};

const objectToString = (data) => {
  return data ? data.toString() : '';
};

const matchLanguage = (data) => {
  data = removeEmptySpace(data);
  data = toLowerCase(data);
  return ['en', 'it', 'it-it,it;q=0.9', 'en-en,en;q=0.9'].includes(data) ? true : false;
};

const isEmailValid = (email) => {
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}
module.exports = {
  getObjectId,
  getSlugData,
  stringToObjectId,
  searchUserData,
  getCurrentLanguage,
  isEmailValid,
  removeEmptySpace,
  toLowerCase,
  matchLanguage,
  isObjectIds,
  stringToObjectIds,
  removeFileFromFolder,
  removeFalseValueFromArray,
  getFileExtension,
  stringToNumber,
  objectToString
};
