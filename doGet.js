// An API which returns filtered result if up two two parameters are passed in the request URL ; if there are none, all the data is passed
function doGet(e) {
  let params = e.parameters;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName(" "); // worksheet name removed
  let data = ws.getRange("A1").getDataRegion().getValues(); // get all the data in sheed
  const headers = data.shift();   //separate the header for later use


  // map the data to create JSON object
  const jsonArray = data.map(r => {
      let obj = {};
      headers.forEach((h, i) => {
          obj[h] = r[i];
      });
      return obj;
  })
  
  
  const info = jsonArray;
  let keys = Object.keys(params);
  let values = Object.values(params);

  let criteria = [];

  keys.forEach((key, i) => {
      var newObj = new Object();
      newObj.Field = key;
      newObj.Values = values[i];
      criteria.push(newObj)
  });

  let filtered = info.flexFilter(criteria);
  const responseAll = [{ status: 200, data: jsonArray }]
  const reponseFiltered = [{ status: 200, data: filtered }]

  if (params) {
      return ContentService
          .createTextOutput(JSON.stringify(reponseFiltered))
          .setMimeType(ContentService.MimeType.JSON);
  } else {
      return ContentService
          .createTextOutput(JSON.stringify(responseAll))
          .setMimeType(ContentService.MimeType.JSON);
  }
}




