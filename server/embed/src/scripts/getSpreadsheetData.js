import tabletop from 'tabletop';

export default function(spreadsheetUrl, updateState){
  let output = {};
  tabletop.init({
    key: spreadsheetUrl, // copy of live spreadsheet
    callback: success
  });

  function success(data, tabletop) {
    formatData(data);
    updateState(true, output.filters);
    console.log(output)
  }

  function formatData(data){
    let filterNames = [];
    let contactList = [];
    for(var key in data){
      let sheet = data[key];
      filterNames.push(sheet.name);
      contactList.push(sheet.elements);
    }
    output.filters = filterNames;
    output.contactList = contactList;
  }
}
