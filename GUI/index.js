//const request= require("request");
// const { response } = require("express");
let pulledData;
var globalfilename = "P39-W2-S4.mat";
var globalframes;

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
      alert("File is uploaded successfully and is saved under " + data.path);

      globalfilename = files[0].name;
      console.log("The file name is " + globalfilename);
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
  var progressBar = document.getElementById("progressBar");

  if (progressBar) progressBar.style.display = "block";
  var existingt = document.getElementById("results");
  if (existingt) {
    existingt.remove();
  }

  fetch(
    "http://localhost:8080/getml?" +
      new URLSearchParams({
        filenom: globalfilename,
      }),
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (progressBar) progressBar.style.display = "none";
      globalframes = json;
      resettable(globalframes);
    })
    .catch(function (err) {
      if (progressBar) progressBar.style.display = "none";
      console.log("Fetch problem: " + err.message);
    });

  /*.then((response) => response.json())
	.then((data => puylledData=data))
	.catch((error) => {
	alert("ERROR: " + error);
	console.error(error);
	console.log(pulledData);
	});*/
}

function getbacktable() {
  var b2show = document.getElementById("hideimage");
  var imagediv = document.getElementById("imagetable");
  imagediv.style.display = "none";
  b2show.style.display = "none";
  var table = document.getElementById("resulttable");
  var b2hide = document.getElementById("viewimage");
  table.style.display = "block";
  b2hide.style.display = "inline";
  var figure1 = document.getElementById("figure1");
  var figure2 = document.getElementById("figure2");
  var figure3 = document.getElementById("figure3");
  figure1.remove();
  figure2.remove();
  figure3.remove();
}

function setTable(frames) {
  //console.log(frames);
  //console.log(globalframes);
  $(document).ready(function () {
    var table = $("#results").DataTable({
      data: globalframes,
      columns: [
        { title: "Frame 1" },
        { title: "Frame 2" },
        { title: "Frame 3" },
      ],
    });

    for (var i = 0; i < globalframes.output.length; i++) {
      table.row.add([
        i,
        globalframes.output[i].frame1,
        globalframes.output[i].frame2,
        globalframes.output[i].percent,
      ]);
    }
  });
}
function resettable(data) {
  console.log(data.output);
  console.log(data.output[1].frame1);
  console.log(data.output[1].percent);
  var resultdiv = document.createElement("div");
  var newresultstable = document.createElement("table");
  newresultstable.id = "results";
  newresultstable.className = "center";
  var divContainer = document.getElementById("resulttable");
  divContainer.innerHTML = "";
  divContainer.appendChild(newresultstable);
  var array1 = data;
  //Make the table head
  let thead = newresultstable.createTHead();
  let row = thead.insertRow();
  let th1 = document.createElement("th");
  th1.style = "width:30%";
  let text1 = document.createTextNode("Rank");
  th1.appendChild(text1);
  row.appendChild(th1);
  let th2 = document.createElement("th");
  th2.style = "width:30%";
  let text2 = document.createTextNode("Frame 1");
  th2.appendChild(text2);
  row.appendChild(th2);
  let th3 = document.createElement("th");
  th3.style = "width:30%";
  let text3 = document.createTextNode("Frame 2");
  th3.appendChild(text3);
  row.appendChild(th3);
  let th4 = document.createElement("th");
  th4.style = "width:30%";
  let text4 = document.createTextNode("Probability");
  th4.appendChild(text4);
  row.appendChild(th4);
  //Make the rows
  console.log(data.output.length);
  for (var i = 0; i < data.output.length; i++) {
    tr = newresultstable.insertRow(-1);
    var cell1 = tr.insertCell(-1);
    cell1.innerHTML = i + 1;
    for (key in data.output[i]) {
      var cell = tr.insertCell(-1);
      cell.innerHTML = data.output[i][key];
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
        var b2show = document.getElementById("hideimage");
        var imagediv = document.getElementById("imagetable");
        imagediv.style.display = "none";
        b2show.style.display = "none";
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

  // Bind the click event to the 'viewimage' button
  $("#viewimage").click(function getimages() {
    alert("fetching images");
    // console.log(globalframes);
    var table = document.getElementById("resulttable");
    var b2hide = document.getElementById("viewimage");
    table.style.display = "none";
    b2hide.style.display = "none";
    var b2show = document.getElementById("hideimage");
    var imagediv = document.getElementById("imagetable");
    imagediv.style.display = "block";
    b2show.style.display = "inline";
    //Make Figure 1
    var figure1 = document.createElement("figure");
    figure1.id = "figure1";
    figure1.style = "text-align:center;";
    var figure1caption = document.createElement("figcaption");
    figure1caption.innerHTML = "Top Pair 1: Frames 17 and 22";
    var frame11 = document.createElement("img");
    frame11.src = "./P39-W2-S4_Bmode/I17.jpg";
    frame11.style = "width:300px";
    frame11.style = "height:300px";
    var frame12 = document.createElement("img");
    frame12.src = "./P39-W2-S4_Bmode/I22.jpg";
    frame12.style = "width:300px";
    frame12.style = "height:300px";

    var strain1722 = document.createElement("img");
    strain1722.id = "strain1722";
    strain1722.src = "./P39-W2-S4_Bmode/strain1722.png";
    strain1722.style = "width:300px";
    strain1722.style = "height:300px";
    figure1.appendChild(strain1722);
    figure1.appendChild(frame11);
    figure1.appendChild(frame12);
    figure1.appendChild(figure1caption);
    imagediv.appendChild(figure1);
    //Make Figure 2
    var figure2 = document.createElement("figure");
    figure2.id = "figure2";
    figure2.style = "text-align:center;";
    var figure2caption = document.createElement("figcaption");
    figure2caption.innerHTML = "Top Pair 2: Frames 13 and 22";
    var frame21 = document.createElement("img");
    frame21.src = "./P39-W2-S4_Bmode/I13.jpg";
    frame21.style = "width:300px";
    frame21.style = "height:300px";
    var frame22 = document.createElement("img");
    frame22.src = "./P39-W2-S4_Bmode/I22.jpg";
    frame22.style = "width:300px";
    frame22.style = "height:300px";
    var strain1322 = document.createElement("img");
    strain1322.src = "./P39-W2-S4_Bmode/strain1322.png";
    strain1322.style = "width:300px";
    strain1322.style = "height:300px";
    figure2.appendChild(strain1322);
    figure2.appendChild(frame21);
    figure2.appendChild(frame22);
    figure2.appendChild(figure2caption);
    imagediv.appendChild(figure2);
    //Make Figure 3
    var figure3 = document.createElement("figure");
    figure3.id = "figure3";
    figure3.style = "text-align:center;";
    var figure3caption = document.createElement("figcaption");
    figure3caption.innerHTML = "Top Pair 3: Frames 15 and 23";
    var frame31 = document.createElement("img");
    frame31.src = "./P39-W2-S4_Bmode/I15.jpg";
    frame31.style = "width:300px";
    frame31.style = "height:300px";
    var frame32 = document.createElement("img");
    frame32.src = "./P39-W2-S4_Bmode/I23.jpg";
    frame32.style = "width:300px";
    frame32.style = "height:300px";
    var strain1523 = document.createElement("img");
    strain1523.src = "./P39-W2-S4_Bmode/strain1523.png";
    strain1523.style = "width:300px";
    strain1523.style = "height:300px";
    figure3.appendChild(strain1523);
    figure3.appendChild(frame31);
    figure3.appendChild(frame32);
    figure3.appendChild(figure3caption);
    imagediv.appendChild(figure3);

    // bind click event to all images
    $("img").on("click", function (e) {
      // define a dialog which will open upon clicking the image
      $("#dialog").dialog({
        autoOpen: false,
        maxWidth: 1000,
        maxHeight: 1000,
        width: 900,
        height: 550,
        resizable: true,
        modal: true,
        open: function (event, ui) {
          var imgPath = $(this).data("imgPath");
          $("#image").attr("src", imgPath).width("800px").height("400px");

          $("#image").attr("originalWidth", 800);
          $("#image").attr("originalHeight", 400);

          $("button.ui-dialog-titlebar-close").hide();
        },
        buttons: {
          Close: function () {
            // destroy the dialog upon close
            $("#dialog").dialog("destroy").remove();

            // re-create the dialog html for next click
            $("#dialogTemplate").append(
              "<div id='dialog' title='Image' style='display:none'><img id='image'></div>"
            );
          },
        },
      });

      // bind dialog resize event
      $("#dialog").bind("dialogresize", function (event, ui) {
        var scaleWidth = ui.size.width / ui.originalSize.width;
        var scaleHeight = ui.size.height / ui.originalSize.height;

        // select the image and assign its reference to variable image$
        var image$ = $("#image");

        // get original dimension
        var originalWidth = image$.attr("originalWidth");
        var originalHeight = image$.attr("originalHeight");

        // scaling the dimension based on dialog size
        var imageWidth = image$.attr("originalWidth") * scaleWidth;
        var imageHeight = image$.attr("originalHeight") * scaleHeight;

        // set image with new dimension
        image$.width(imageWidth).height(imageHeight);
      });

      //   e.preventDefault();
      $("#dialog")
        .data("imgPath", $(this).attr("src")) // The important part .data() method
        .dialog("open");
    });

    // \Preprocessing\P39-W2-S4_Bmode	// relative path for images
  });
});
