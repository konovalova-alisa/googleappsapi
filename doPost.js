function doPost(e) {
  // { "name" : "Joe" } response should be something like this

  const requiredColumns = ["name", "company"];
  let JSONresponse;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName("CustomerData");
  const headers1 = ws.getRange(1,1,1,ws.getLastColumn()).getValues()[0];
  const headersOriginalOrder = headers1.slice();
  headers1.sort();
  // In this specific spreadsheeet the "created" column is not needed in response, it will be autopopulated
  let index = headers1.indexOf('created');
  if (index !== -1) {
  headers1.splice(index, 1);
    }
  Logger.log(headers1); 

  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const headersPassed = Object.keys(bodyJSON).sort();
  const userID = bodyJSON.name.toLowerCase().replace(/ /g, ".");
  bodyJSON.user_id = userID;
  let time = timeFunction();
  bodyJSON.created = time;
  let passcode = generatePassword();
  bodyJSON.password = passcode;
  
    if(!checkColumnsPassed_(headers1,headersPassed,requiredColumns)){
      //jsonResponse = {status:500,message:"Invalid Arguments Passed"};
      //return sendJSON_(jsonResponse);
      throw new Error("Something Went Wrong");
      return;
    }

 const arrayOfData =  headersOriginalOrder.map(h => bodyJSON[h]);
  
    // const aoaIds = ws.getRange(2,1,ws.getLastRow(),1).getValues();
   //  const newIdNumber = getMaxFromArrayOfArray_(aoaIds) + 1;
    ws.appendRow(arrayOfData);  //let's add the values to the new row
   //  bodyJSON.id = newIdNumber;
    return sendJSON_(bodyJSON); //sending response tot he requester

  
   

}
