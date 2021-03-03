function login(e) {
  var loginId = document.getElementById("loginId").value;
  var password = document.getElementById("password").value;

  var loginStatus = document.getElementById("loginStatus");

  if (!loginId) {
    if (loginStatus) {
      loginStatus.style.display = "inline";
      loginStatus.innerHTML = "ID is required";
    }

    return;
  }

  if (!password) {
    if (loginStatus) {
      loginStatus.style.display = "inline";
      loginStatus.innerHTML = "Password is required";
    }

    return;
  }

  if (loginStatus) {
    loginStatus.style.display = "none";
    loginStatus.innerHTML = "";
  }

  const formData = new FormData();
  formData.append("loginId", loginId);
  formData.append("password", password);

  fetch("http://localhost:8080/login", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        console.log(data);

        window.location = "index.html";
      } else {
        if (loginStatus) {
          loginStatus.style.display = "inline";
          loginStatus.innerHTML = "Invalid login";

          document.getElementById("loginId").focus();
        }
      }
    })
    .catch((error) => {
      alert("ERROR: " + error);
      console.error(error);
    });
}

/* change(element, value) {
  var loginStatus = document.getElementById("loginStatus");

  if (!value) {
    if (loginStatus) {
      loginStatus.style.display = 'inline';
      loginStatus.innerHTML = element + " is required"
    }
  }
  else {
    if (loginStatus) {
      loginStatus.style.display = 'none';
      loginStatus.innerHTML = '';
    }
  }
} */

/*
window.onload = function () {
  var loginStatus = document.getElementById("loginStatus");

  if (loginStatus) loginStatus.style.display = "none";
};

*/

window.onload = function () {
  var loginId = document.getElementById("loginId");
  var password = document.getElementById("password");

  var loginStatus = document.getElementById("loginStatus");

  if (loginStatus) loginStatus.style.display = "none";

  loginId.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      login();
    }
  });

  password.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      login();
    }
  });
};
