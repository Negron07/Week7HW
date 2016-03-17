$(function(){
	var currentTrainSchedule = $(".table");
	var fireBase = new  Firebase("https://traintime.firebaseio.com/");

	$("#submitButton").on("click", function(e){
		var userInput = $("#name").val().toUpperCase();
		var destination = $("#destination").val(),
			firstTrainTime = $("#firstTrainTime").val(),
			frequency = $("#frequengcy")().val();

			fireBase.push({
				name: userInput,
				destination: destination,
				firstTrainTime: firstTrainTime,
				frequency: frequency


			});
	});

	fireBase.on("child_added", function (snapshot) {
// not sure if this is one right 
            var snapValue = snapshot.val();
            var newRow = $("<tr>");
// confusing

            var newFreq = snapshot.val().frequency;
         	var nextArrival = ((firstTrainTime + newFreq));
         	var minutesAway = ((firstTrainTime - nextArrival));

         	var newFreq = 5;
         	var newFirstTrainTime = "12:00";
         	var firstTimeConverted = moment(newFirstTrainTime, "hh:mm").subtract(1, "years");
         	var currentTime = moment();
         	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
         	var tRemainder = diffTime % newFreq;
         	var minutesAway = newFreq - tRemainder;
         	var nextTrain = moment().add(minutesAway, "minutes")


         	[snapValue.newFreq, snapValue.newFreq, snapValue.nextArrival, snapValue.minutesAway].forEach(function(snapItem){
         		var newRowValue = $("<td>");
         		newRowValue.text(snapItem);
         		newRow.append(newRowValue);

// ^^^^^ not sure whats right and whats wrong
         	});


         	currentTrainSchedule.append(newRow);
        });

    })

