// when user clicks on U.E.F.I 2.0
function home() {
	window.location = "index.html";
}

// on window load
window.onload = function () {
	// send POST request to get username
	fetch("http://localhost:8080/getUser", {
		method: "POST",
	})
		// return the promise resulting from parsing the body text of the response stream as JSON
		.then((response) => response.json())
		.then((data) => {
			console.log("login", data);
			// set loginId equal to html element
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
