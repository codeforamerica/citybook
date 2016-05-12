import tabletop from 'tabletop';

export default function(spreadsheetUrl, updateState){
  let output = {};
  tabletop.init({
    key: spreadsheetUrl, // copy of live spreadsheet
    callback: success
  });

  function success(data) {
    formatData(data);
    updateState(true, output.filters, output.contactList);
  }

  function formatData(data){
    let
      filterNames = [],
      contactList = [];
    for(var key in data){
      let
        sheet = data[key],
        contacts = sheet.elements;
      filterNames.push(sheet.name);
      for(var row in contacts){
        contactList.push(contacts[row]);
      }
    }
    output.filters = filterNames;
    output.contactList = contactList;
  }
}
