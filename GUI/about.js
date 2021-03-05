function home() {
	window.location = "index.html";
}

window.onload = function () {
	fetch("http://localhost:8080/getUser", {
	  method: "POST",
	})
	  .then((response) => response.json())
	  .then((data) => {
		console.log("longin", data);
		var loginId = document.getElementById("loginId");
  
		if (data && loginId) {
		  if (loginId) loginId.innerHTML = data.loginId;
		} else window.location = "http://localhost:8080";
	  })
	  .catch((error) => {
		alert("ERROR: " + error);
		console.error(error);
	  });
  };
  