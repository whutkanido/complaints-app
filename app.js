console.log("test test 1-2-3");

// Writes data to the page after getting it from API call

const writer = data => {
  data.forEach(obj => {
    const $writeProperty = $("<div>").text('Detail: ' + obj.descriptor);
    const $writePropertyTwo = $("<div>").text('Type: ' + obj.complaint_type);
    const $finalWrite = $('<p>').append($writePropertyTwo,$writeProperty)
    
    $(".container").append($finalWrite);
    });
};

// Clears out old borough data when you call data for a new borough

const clearContainer = () => {
  $(".container").empty();
};

$(() => {

  // When user clicks a button, assign the value of that button to $borough
  $("button").on("click", event => {
    clearContainer();
    const $borough = $(event.currentTarget).val();
    
    // Grab the number the user input on the form, assign it to $formInput
    
    const $formInput = parseInt($("#complaints-input").val());
    
    // If a user does not specify a number of complaints, default to 10

    let $numComplaints = 10;

    // If a user has specified a number of complaints, then assign that value to $numComplaints

    if ($formInput) $numComplaints = $formInput;

    // API call, filtered by agency = NYPD and borough = the button clicked by user
    
    const $promise = $.ajax({
      url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json?",
      type: "GET",
      data: {
        $limit: $numComplaints,
        $$app_token: "2BMU2ViCsawW9cr4wgFmd6SN7",
        agency: "NYPD",
        borough: $borough
      }
    });

    // Send data collected from API call to get written to the DOM
    
    $promise.then(
      (data) => {
      writer(data);
    });
  });
});
