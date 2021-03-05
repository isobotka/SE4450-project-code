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
			data.path +
			", python result: " +
			data.result
		);
  
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
  