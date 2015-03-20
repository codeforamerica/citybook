var list, source, template, serviceType, alink;

function init() {

  // init handlebars
  getTemplateAjax('static/templates/service.handlebars');
  
  // get the list information via tabletop
  getList.tabletop();

  alink = new Autolinker( {
    className: "myLink"
  } );

  // use this if using get.py
  // getList.local();
}

function getTemplateAjax(path) {
  var source;

  $.ajax({
    url: path,
    cache: true,
    success: function(data) {
      source    = data;
      template  = Handlebars.compile(source);
    }
  });
}

var getList = {
  tabletop: function() {
    console.log('FUNCTION: getList.tabletop()');
    Tabletop.init({
      key: '1liPb1u_Z09Du8L--OjNWl_zZi7KE0_-ejIHw5OfkslQ',
      callback: success,
    })
  },
  local: function() {
    $.ajax({
      url: '../list.json',
      dataType: 'json',
      success: success,
      error: function(err) {
        console.error(err);
      }
    });
  }
}

/* 
callback function after the list data has
been returned successfully. Add it to `list`
so we have access to the information globally */
function success(data) {
  list = data;
  listLoop();
}

function initSearch() {
  console.log('FUNCTION: initSearch()');
  var options = {
    valueNames: [ 'title', 'description', 'population', 'criteria', 'contact', 'cost' ]
  }
  var searchList = new List('service-list-wrapper', options);
  console.log(searchList);
}

function initAutocomplete() {
  var serviceNames = [];
  $(".title").each(function() {serviceNames.push($(this).text())});

  var serviceNamesBloodhound = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: $.map(serviceNames, function(serviceName) { return { value: serviceName }; })
  });
 
  serviceNamesBloodhound.initialize();
 
  $('#search .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'serviceNamesBloodhound',
    displayKey: 'value',
    source: serviceNamesBloodhound.ttAdapter()
  });
}

function listLoop() {
  firstFilter();

  for (var key in list) {

    // let's run this IIFE function to keep our 
    // for loop scope while we go through it
    // 'sheet' is the spreadsheet's tabulated sheet and represents list[key]
    (function(sheet) {

      // name of the service, originally from the sheet name
      serviceType = key.toString();

      // create a filter button for each serviceType
      createFilter(serviceType, sanitize(serviceType));

      // now lets get each row as "service" in k
      sheet.elements.forEach(handleService);
      

    })(list[key]);

  }

  // initialize the searchable list now that it has content
  initSearch();
  initAutocomplete();
}


function handleService(service, index, array) {

  // set data for usage in handlebar template
  var data = {
    title: service['Provider/Program'],
    description: service['Description'],
    serviceClass: sanitize(serviceType),
    cost: service['Cost/Fee'],
    contact: service['Contact Info'],
    population: service['Population Served'],
    criteria: service['Criteria']
  }

  // append handlebar response to service list
  document.getElementById('services-list').innerHTML += template(data);

}

function firstFilter() {
  var servicesFilterList = document.getElementById('services-filter');
  var all = document.createElement('button');
  all.innerHTML = 'All';
  all.className = 'service-filter btn btn-success active';
  all.setAttribute('data', 'all');
  all.setAttribute('type', 'button');
  all.addEventListener('click', filterClick, false);
  servicesFilterList.appendChild(all);
}

function createFilter(type, sanitized) {
  var servicesFilterList = document.getElementById('services-filter');
  var filter = document.createElement('button');
  filter.innerHTML = type;
  filter.className = 'service-filter btn btn-success';
  filter.setAttribute('data', sanitized);
  filter.setAttribute('type', 'button');
  filter.addEventListener('click', filterClick, false);
  servicesFilterList.appendChild(filter);
}

function sanitize(string) {
  var s = string.replace(/[^A-Z0-9]/ig, "-");
  s = s.toLowerCase();
  return s;
}

function filterClick() {

  // using jQuery here for simplicity
  if(!$(this).hasClass('active')) {
    var show = $(this).attr('data');
    $('.service-filter').removeClass('active');
    $(this).addClass('active');
    if(show=='all') {
      $('.service').show();  
    } else {
      $('.service').hide();
      $('.'+show).show();
    }
  }  

}

/*
Handlebars helper that filters and adds <a> to any plain text
URLs within the text. This can be passed in the .handlebars
templates within any {{ content }} by adding it before the content piece
{{ add-links content }}
*/
Handlebars.registerHelper('add-links', function(context) {
  var linked = alink.link(context);
  return new Handlebars.SafeString(linked);
});

window.onload = init();