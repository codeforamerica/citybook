
var baseURL = 'http://codeforamerica.github.io/citybook/static/?key=';
var spreadsheetKey = '';
var cityBookTitle = 'Placeholder Title';
var cityBookWidth = '100';
var cityBookHeight = '600';

$(document).ready(function(){
  var clipboard = new Clipboard('.clipboard-btn');

  clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });

  $('#citybook-height').val(cityBookHeight);
  $('#citybook-width').val(cityBookWidth);

  $("input[type='text']" ).on('input',function(e){
    var keyInput = $('#spreadsheet-key').val();

    //Test if the user entered a link to a Google spreadsheet
    if(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//.test(keyInput)){
      spreadsheetKey = keyInput.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//)[1];
      $("#spreadsheet-key-input-group").addClass('has-warning');
      $("#spreadsheet-key-input-group").removeClass('has-error');
      $("#spreadsheet-key-input-group").removeClass('has-success');
      $("#spreadsheet-key-pending").fadeIn();
      //$("#spreadsheet-key-error", "#spreadsheet-key-success").fadeOut(200, function(){
      //});

      //Test if the spreadsheet is publicly accessible
      $.ajax({
        url: "https://spreadsheets.google.com/feeds/list/" + spreadsheetKey + "/1/public/full?alt=json",
        dataType: 'json',
        success: success,
        error: function(err) {
          $("#spreadsheet-key-alerts").fadeOut(200, function(){
            $("#spreadsheet-key-pending").hide();
            $("#spreadsheet-key-success").hide();
            $("#spreadsheet-key-input-group").removeClass('has-success', 'has-warning');
            $("#spreadsheet-key-input-group").addClass('has-error');
            $("#spreadsheet-key-error").show();
            $("#spreadsheet-key-alerts").fadeIn(200);
            return;
          });
        }
      });

      function success(data){
        $("#spreadsheet-key-alerts").fadeOut(200, function(){
          $("#spreadsheet-key-pending").hide();
          $("#spreadsheet-key-error").hide();
          $("#spreadsheet-key-input-group").removeClass('has-error');
          $("#spreadsheet-key-input-group").removeClass('has-warning');
          $("#spreadsheet-key-input-group").addClass('has-success');
          $("#spreadsheet-key-success").show();
          $("#spreadsheet-key-alerts").fadeIn(200);
        });
      }

    } else {
      $("#spreadsheet-key-alerts").fadeOut(200, function(){
        $("#spreadsheet-key-pending").hide();
        $("#spreadsheet-key-success").hide();
        $("#spreadsheet-key-input-group").addClass('has-error');
        $("#spreadsheet-key-input-group").removeClass('has-success, has-warning');
        $("#spreadsheet-key-error").show();
        $("#spreadsheet-key-alerts").fadeIn(200);
      });
      return;
    }

    cityBookTitle = $('#citybook-title').val();
    cityBookHeight = $('#citybook-height').val();
    cityBookWidth = $('#citybook-width').val();

    safeTitle = encodeURIComponent(cityBookTitle);

    srcUrl = baseURL + spreadsheetKey + '&title=' + safeTitle;
    iframeEmbed = '<iframe src="' + srcUrl + '" width="' + cityBookWidth + '%" height="' + cityBookHeight + 'px" frameboarder="0"></iframe>';

    $('#citybook-test').attr('href', srcUrl);
    $('#link-output').val(srcUrl);
    $('#embed-output').val(iframeEmbed);

  });

});
