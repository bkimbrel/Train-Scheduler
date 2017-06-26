$(document).ready(function() {
     var config = {
    apiKey: "AIzaSyCPx5sdww52-BtRNahR1CDjQvOHRcjKh80",
    authDomain: "trainscheduler-4132a.firebaseapp.com",
    databaseURL: "https://trainscheduler-4132a.firebaseio.com",
    projectId: "trainscheduler-4132a",
    storageBucket: "trainscheduler-4132a.appspot.com",
    messagingSenderId: "239335509530"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


  //Button for adding a Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  
  var frequency = moment($("#frequency-input").val().trim(), "HH:mm").format("HH:mm");
  var nextArrival = $("#nextArrival-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    target: destination,
    recurrence: frequency,
    landing: nextArrival
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.target);
  console.log(newTrain.recurrence);
  console.log(newTrain.landing);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#nextArrival-input").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().target;
  var frequency = childSnapshot.val().recurrence;
  var nextArrival = childSnapshot.val().landing;
  // train Info
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(nextArrival);


  var setFrequency = 3;
  var firstTime = "03:30";
  console.log(firstTime); 

  var firstTimeConverted = moment(childSnapshot.val().time, "HH:mm").subtract(1, "years"); 
  console.log(firstTimeConverted);
  // Current Time
  var currentTime = moment();
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // Time apart (remainder)
  var tRemainder = diffTime % childSnapshot.val().frequency;
  // Minutes until train
  var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "HH:mm");
  console.log(nextTrain);
  // Next train arrival formatted
  var nextTrainArrival = moment(nextTrain).format("HH:mm");
  console.log(nextTrainArrival);
 
  // var arrivalDiff = moment().diff(moment.unix(frequency, "01:00"), "hours");
  // console.log(arrivalDiff);


  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination +
  "</td><td id='frequency-input'>" + frequency + "</td><td>" 
    + nextArrival + "</td><td>" + nextTrain + "</td></tr>");
  


  });

});

