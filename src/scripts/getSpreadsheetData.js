import tabletop from 'tabletop';

export default function(spreadSheetKey, updateState){
  let output = {};
  if(spreadSheetKey){
    tabletop.init({
      key: spreadSheetKey, // copy of live spreadsheet
      callback: success
    });
  } else {
    let error = {type: 'danger', message: 'Warning: No spreadsheet link provided. Your CityBook cannot load.'};
    updateState(false, null, null, error);
  }

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
        let contactObject = contacts[row];
        contactObject.category = sheet.name;
        contactList.push(contactObject);
      }
    }
    output.filters = filterNames;
    output.contactList = contactList;
  }
}
