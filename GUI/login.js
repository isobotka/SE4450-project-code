// login function triggered when user clicks on "Login" button, or hits the enter key
function login(e) {
  var loginId = document.getElementById("loginId").value;
  var password = document.getElementById("password").value;

  var loginStatus = document.getElementById("loginStatus");

  if (!loginId) {
    // if loginStatus is uninitialized
    if (loginStatus) {
      loginStatus.style.display = "inline";
      loginStatus.innerHTML = "ID is required";
    }

    return;
  }

  // if no password, inform user
  if (!password) {
    if (loginStatus) {
      loginStatus.style.display = "inline";
      loginStatus.innerHTML = "Password is required";
    }

    return;
  }

  // if loginStatus is uninitialized
  if (loginStatus) {
    loginStatus.style.display = "none";
    loginStatus.innerHTML = "";
  }

  const formData = new FormData();
  formData.append("loginId", loginId);
  formData.append("password", password);

  // attempt to login, sending login POST request to server
  fetch("http://localhost:8080/login", {
    method: "POST",
    body: formData,
  })
    // return the promise resulting from parsing the body text of the response stream as JSON
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        console.log(data);

        window.location = "index.html";
      } else {
        // if loginStatus is uninitialized
        if (loginStatus) {
          loginStatus.style.display = "inline";
          loginStatus.innerHTML = "Invalid login";

          // brings user's cursor to loginId input field
          document.getElementById("loginId").focus();
        }
      }
    })
    // display error on console
    .catch((error) => {
      alert("ERROR: " + error);
      console.error(error);
    });
}

// on window load
window.onload = function () {
  // get the loginId and password inputted by user in text box
  var loginId = document.getElementById("loginId");
  var password = document.getElementById("password");

  var loginStatus = document.getElementById("loginStatus");

  if (loginStatus) loginStatus.style.display = "none";

  // bind an event listener to loginId, if user releases a key
  loginId.addEventListener("keyup", function (event) {
    // if the key released was the enter key, attempt to login
    if (event.keyCode == 13) {
      login();
    }
  });

  // bind an event listener to password, if user releases a key
  password.addEventListener("keyup", function (event) {
    // if the key released was the enter key, attempt to login
    if (event.keyCode == 13) {
      login();
    }
  });
};
