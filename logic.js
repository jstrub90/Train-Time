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
    var sv = snapshot.val();

    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.trainTime);
    console.log(sv.frequency);
    
//     var tr = `<tr>
//                   <td>${sv.name}</td>
//                   <td>${sv.role}</td>
//                   <td>${sv.startDate}</td>
//                   <td>${monthsWorked}</td>
//                   <td>${sv.monthlyRate}</td>
//                   <td>${totalBilled}</td>
//               </tr>`
//   $("#tableBody").append(tr);


})