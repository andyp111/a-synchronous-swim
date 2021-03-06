// const messages = require('../../server/js/keypressHandler.js');

(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  // console.log(messages);
  //
  // TODO: build the swim command fetcher here
  //
  const ajaxTest = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl, //filter the data type if valid message, then move, if image then set css background
      // http://127.0.0.1:3000/background.jpg
      // contentType: 'application/json',
      success: (data) => {
        console.log(data);
        SwimTeam.move(data);
        console.log('GET WAS SUCCESSFUL');
      },
      error: () => {
        console.log('error');
      },
      complete: setTimeout(ajaxTest, 5000),
    })
    return false;
  }
  ajaxTest();





  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
