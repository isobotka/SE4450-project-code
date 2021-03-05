const { response } = require("express");
let pulledData;
var globalfilename='P39-W2-S4.mat';

function uploadData() {
	var fileUpload = document.getElementById("uploadedFile");
  
	const files = fileUpload.files;
  
	if (!files || files.length == 0) {
	  alert("No file is selected. Please select a file for upload");
  
	  return;
	}
  
	const formData = new FormData();
	formData.append("myFile", files[0]);
  
	fetch("http://localhost:8080/upload", {
	  method: "POST",
	  body: formData,
	})
	  .then((response) => response.json())
	  .then((data) => {
		alert(
		  "File is uploaded successfully and is saved under " +
			data.path 
		);
		
		globalfilename=files[0].name
        console.log("The file name is "+globalfilename);
		console.log(data.path);
  
	  })
	  .catch((error) => {
		alert("ERROR: " + error);
		console.error(error);
	  });
  }
  
  function about() {
	window.location = "about.html";
  }
  
  function logout() {
	fetch("http://localhost:8080/logout", {
	  method: "POST",
	})
	  .then((response) => response.json())
	  .then((data) => {
		if (data.status == "success") window.location = "http://localhost:8080";
  
		console.log(data.path);
	  })
	  .catch((error) => {
		alert("ERROR: " + error);
		console.error(error);
	  });
  }

  function getml() {
	fetch("http://localhost:8080/getml?"+ new URLSearchParams({
		filenom: globalfilename,
 }), {
		method: "GET",
	}).then(function(response){
		return response.json();
	}).then(function(json) {
		let frames = json;
		resettable(frames);
	  }).catch(function(err) {
		console.log('Fetch problem: ' + err.message);
	  });

		/*.then((response) => response.json())
		.then((data => puylledData=data))
		.catch((error) => {
		alert("ERROR: " + error);
		console.error(error);
		console.log(pulledData);
		});*/
}
	  
  
function resettable(data)
{
	console.log(data.output);
	console.log(data.output[1].frame1)
	console.log(data.output[1].percent)
	var resultdiv=document.createElement("div")
    var newresultstable=document.createElement("table");
	newresultstable.id='results'
	newresultstable.className="center"
	var divContainer=document.getElementById('resulttable')
	divContainer.innerHTML="";
	divContainer.appendChild(newresultstable)
	var array1=data
	//Make the table head
	let thead= newresultstable.createTHead();
	let row = thead.insertRow();
	let th1=document.createElement("th");
	th1.style="width:30%"
	let text1 = document.createTextNode("Rank")
	th1.appendChild(text1);
	row.appendChild(th1);
	let th2=document.createElement("th");
	th2.style="width:30%"
	let text2 = document.createTextNode("Frame 1")
	th2.appendChild(text2);
	row.appendChild(th2);
	let th3=document.createElement("th");
	th3.style="width:30%"
	let text3 = document.createTextNode("Frame 2")
	th3.appendChild(text3);
	row.appendChild(th3);
	let th4=document.createElement("th");
	th4.style="width:30%"
	let text4 = document.createTextNode("Probability")
	th4.appendChild(text4);
	row.appendChild(th4);
	//Make the rows
	console.log(data.output.length)
    for(var i=0 ; i < data.output.length; i++){
		tr=newresultstable.insertRow(-1)
		var cell1=tr.insertCell(-1)
		cell1.innerHTML=i+1
		for (key in data.output[i])
		{
			var cell=tr.insertCell(-1)
			cell.innerHTML=data.output[i][key]
		}
	  }
}

  window.onload = function () {
	fetch("http://localhost:8080/getUser", {
	  method: "POST",
	})
	  .then((response) => response.json())
	  .then((data) => {
		var loginId = document.getElementById("loginId");
  
		if (data && data.loginId) {
		  if (loginId) loginId.innerHTML = data.loginId;
		} else window.location = "http://localhost:8080";
	  })
	  .catch((error) => {
		alert("ERROR: " + error);
		console.error(error);
	  });
  
	  

	var output = [
	  [2, 8, 0.9],
	  [3, 10, 0.84],
	  [3, 15, 0.8],
	  [4, 15, 0.73],
	  [6, 21, 0.66],
	];
  
	//Rank 1
	document.getElementById("r1f1").innerHTML = output[0][0];
	document.getElementById("r1f2").innerHTML = output[0][1];
	document.getElementById("r1p").innerHTML = output[0][2];
  
	//Rank 2
	document.getElementById("r2f1").innerHTML = output[1][0];
	document.getElementById("r2f2").innerHTML = output[1][1];
	document.getElementById("r2p").innerHTML = output[1][2];
  
	//Rank 3
	document.getElementById("r3f1").innerHTML = output[2][0];
	document.getElementById("r3f2").innerHTML = output[2][1];
	document.getElementById("r3p").innerHTML = output[2][2];
  
	//Rank 4
	document.getElementById("r4f1").innerHTML = output[3][0];
	document.getElementById("r4f2").innerHTML = output[3][1];
	document.getElementById("r4p").innerHTML = output[3][2];
  
	//Rank 5
	document.getElementById("r5f1").innerHTML = output[4][0];
	document.getElementById("r5f2").innerHTML = output[4][1];
	document.getElementById("r5p").innerHTML = output[4][2];
  };
  
  // JQuery to display the table
  $(document).ready(function () {
	$("#results").DataTable();
  });
  