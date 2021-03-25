function sendJSON_(JSONresponse) {
  return ContentService
          .createTextOutput(JSON.stringify(JSONresponse))
          .setMimeType(ContentService.MimeType.JSON);
}
 
 function checkColumnsPassed_(arrAllColumns,arrColumnsPassed,arrRequiredColumns){
  
    if(!arrRequiredColumns.every(item => arrColumnsPassed.includes(item))) return false;
    if(!arrColumnsPassed.every(item => arrAllColumns.includes(item))) return false;
    return true;
  
  }

// create timestamp
  function timeFunction() {
    var time = new Date();
    time = Utilities.formatDate(time, "GMT+02:00", 'yyyy-MM-dd hh:mm:ss');
    return time;
}


  //return the highest number / id
  function getMaxFromArrayOfArray_(aoa){
    let maxID = 0;
    aoa.forEach(r => {
      if(r[0] > maxID) maxID = r[0];
    });
    return maxID;
  }


// generate a first login password 
  function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

//helper function for query parameters
Array.prototype.flexFilter = function(info) {
  
  // Set our variables
  var matchesFilter, matches = [], count;

  matchesFilter = function(item) {
    count = 0
    for (var n = 0; n < info.length; n++) {
      if (info[n]["Values"].indexOf(item[info[n]["Field"]]) > -1) {
        count++;
      }
    }
    return count == info.length;
  }

  // Loop through each item in the array
  for (var i = 0; i < this.length; i++) {
    // Determine if the current item matches the filter criteria
    if (matchesFilter(this[i])) {
      matches.push(this[i]);
    }
  }

  // Give us a new array containing the objects matching the filter criteria
  return matches;
}

