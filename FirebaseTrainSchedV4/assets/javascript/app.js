
// this is Michael Clautice's Firebase Train Scheduler V4
// *
// •••••••••••••••••••••••••••••
// ----THE GOOD OLE DOC.READY FUNCTION---- √√
// so the html loads before the JS executes √√
$(document).ready(function() {

// create a config variable to initialize Firebase
// these 6 key:value pairs were provided from Google's Firebase
  var config = {
    apiKey: "AIzaSyAoeQtGqldezwCqFoPt4fy03F-QsP1znsg",
    authDomain: "classdemo-6fd97.firebaseapp.com",
    databaseURL: "https://classdemo-6fd97.firebaseio.com",
    projectId: "classdemo-6fd97",
    storageBucket: "classdemo-6fd97.appspot.com",
    messagingSenderId: "976185159081"
  };
// firebase's initializeApp() function accepts the config var as an arg
  firebase.initializeApp(config);
// assign the database into a var called database
  var database = firebase.database();


// jQuery's preventDefault() is called on the submit button's click event-handler
  $("#add-train-btn").on("click", function(event) {
  		// event.preventDefault();

	 // Grabs user input
	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);


	   // Alert
  		alert("Train successfully added to schedule.");

	 // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});










// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;


	   // Declare variable
  		var trainFreq;

  		// Time is to be entered on the entry form
   		 var firstTime = 0;
// this is where we get to use moment()!
	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);
// this is where we get to use moment()!
	  // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
// this is where we get to use moment()!
	  // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
// this is where we get to use moment()!
		// Time apart (remainder)
	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);
// this is where we get to use moment()!
	    // Minute Until Train
	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// this is where we get to use moment()!
	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

// this is where we get to use moment()!
	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});
// close the doc.ready() function √√
// this is Michael Clautice's Firebase Train Scheduler V4



