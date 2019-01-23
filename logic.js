var config = {
    apiKey: "AIzaSyBK2Io4te8d_pZPFWjEZH4vZEP6lED0xQo",
    authDomain: "traintimez.firebaseapp.com",
    databaseURL: "https://traintimez.firebaseio.com",
    projectId: "traintimez",
    storageBucket: "traintimez.appspot.com",
    messagingSenderId: "602811361780"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event){
      event.preventDefault();
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log(trainTime);
      console.log(frequency);

      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

  });

  database.ref().on("child_added", function(snapshot){
    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextArrival = "";
    var frequency = snapshot.val().frequency;

    // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
    trainRemainder = trainDiff % frequency;

    // subtract the remainder from the frequency, store in var
    minutesTillArrival = frequency - trainRemainder;

    // add minutesTillArrival to now, to find next train & convert to standard time format
    nextArrival = moment().add(minutesTillArrival, "m").format("hh:mm A");
    
    var tr = `<tr>
                  <td>${trainName}</td>
                  <td>${destination}</td>
                  <td>${frequency}</td>
                  <td>${nextArrival}</td>
                  <td>${minutesTillArrival}</td>
              </tr>`
  $("#tableBody").append(tr);


})