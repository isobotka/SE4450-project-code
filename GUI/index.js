//const request= require("request");
// const { response } = require("express");
let pulledData;
var globalfilename = " ";
var globefnom = " ";
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
    // return the promise resulting from parsing the body text of the response stream as JSON
    .then((response) => response.json())
    .then((data) => {
      alert("File is uploaded successfully and is saved under " + data.path);

      globalfilename = files[0].name;
      console.log("The file name is " + globalfilename);
      globefnom = globalfilename.replace(".mat", " ");
      globefnom = globefnom.trim();
      console.log(globefnom);
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

// logout function
function logout() {
  fetch("http://localhost:8080/logout", {
    method: "POST",
  })
    // return the promise resulting from parsing the body text of the response stream as JSON
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

// get results of machine learning to display optimal pairs
function getml() {
  var progressBar = document.getElementById("progressBar");

  if (progressBar) progressBar.style.display = "block";
  var existingt = document.getElementById("results");
  if (existingt) {
    existingt.remove();
  }
   //Sends a request to first server (JS) server whhich sends request to python server
  fetch(
    "http://localhost:8080/getml?" +
    new URLSearchParams({
      //Uploaded file name is saved as globalfilename
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
      //sAVE RESPONSE in global frames data
      globalframes = json;
      resettable(globalframes);
    })
    .catch(function (err) {
      if (progressBar) progressBar.style.display = "none";
      console.log("Fetch problem: " + err.message);
    });
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
  //Creates the visual div to display table but also resets the old table
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
  //Makes the first row/ title head for each row
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

// on window load, send POST request to get user name
window.onload = function () {
  fetch("http://localhost:8080/getUser", {
    method: "POST",
  })
    // return the promise resulting from parsing the body text of the response stream as JSON
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
    console.log(globalframes);
    console.log(globefnom);
    var table = document.getElementById("resulttable");
    var b2hide = document.getElementById("viewimage");
    table.style.display = "none";
    b2hide.style.display = "none";
    var b2show = document.getElementById("hideimage");
    var imagediv = document.getElementById("imagetable");
    imagediv.style.display = "block";
    b2show.style.display = "inline";
    // Make Figure 1
    var figure1 = document.createElement("figure");
    figure1.id = "figure1";
    figure1.style = "text-align:center;";
    var figure1caption = document.createElement("figcaption");
    var frame11val = globalframes.output[0].frame1
    console.log(frame11val);
    var frame12val = globalframes.output[0].frame2
    console.log(frame12val);
    strainname1 = String(frame11val).concat(String(frame12val));
    console.log(strainname1);
    figure1caption.innerHTML = "Top Pair 1: Frames " + frame11val + " and " + frame12val;
    var frame11 = document.createElement("img");
    frame11.src = "./" + globefnom + "/I" + frame11val + ".jpg"
    frame11.style = "width:300px";
    frame11.style = "height:300px";
    var frame12 = document.createElement("img");
    frame12.src = "./" + globefnom + "/I" + frame12val + ".jpg"
    frame12.style = "width:300px";
    frame12.style = "height:300px";
    var strain1 = document.createElement("img");
    strain1.id = strainname1
    strain1.src = "./" + globefnom + "/" + strainname1 + ".png"
    strain1.style = "width:300px";
    strain1.style = "height:300px";
    figure1.appendChild(strain1);
    figure1.appendChild(frame11);
    figure1.appendChild(frame12);
    figure1.appendChild(figure1caption);
    imagediv.appendChild(figure1);
    console.log(globalframes);

    // Make Figure 2
    //Currently this section is hard coded to pull images based on their values from folders in GUI. If MATLAB engine worked, this would not be the case. All of these are just basic HTML DOM Events
    var figure2 = document.createElement("figure");
    figure2.id = "figure2";
    figure2.style = "text-align:center;";
    var figure2caption = document.createElement("figcaption");
    var frame21val = globalframes.output[1].frame1
    console.log(frame21val);
    var frame22val = globalframes.output[1].frame2
    console.log(frame22val);
    strainname2 = String(frame21val).concat(String(frame22val));
    console.log(strainname2);
    figure2caption.innerHTML = "Top Pair 2: Frames " + frame21val + " and " + frame22val;
    var frame21 = document.createElement("img");
    frame21.src = "./" + globefnom + "/I" + frame21val + ".jpg"
    frame21.style = "width:300px";
    frame21.style = "height:300px";
    var frame22 = document.createElement("img");
    frame22.src = "./" + globefnom + "/I" + frame22val + ".jpg"
    frame22.style = "width:300px";
    frame22.style = "height:300px";
    var strain2 = document.createElement("img");
    strain2.src = "./" + globefnom + "/" + strainname2 + ".png"
    strain2.style = "width:300px";
    strain2.style = "height:300px";
    figure2.appendChild(strain2);
    figure2.appendChild(frame21);
    figure2.appendChild(frame22);
    figure2.appendChild(figure2caption);
    imagediv.appendChild(figure2);
    // Make Figure 3
    var figure3 = document.createElement("figure");
    figure3.id = "figure3";
    figure3.style = "text-align:center;";
    var figure3caption = document.createElement("figcaption");
    var frame31val = globalframes.output[2].frame1
    console.log(frame31val);
    var frame32val = globalframes.output[2].frame2
    console.log(frame32val);
    strainname3 = String(frame31val).concat(String(frame32val));
    console.log(strainname3);
    figure3caption.innerHTML = "Top Pair 3: Frames " + frame31val + " and " + frame32val;
    var frame31 = document.createElement("img");
    frame31.src = "./" + globefnom + "/I" + frame31val + ".jpg"
    frame31.style = "width:300px";
    frame31.style = "height:300px";
    var frame32 = document.createElement("img");
    frame32.src = "./" + globefnom + "/I" + frame32val + ".jpg"
    frame32.style = "width:300px";
    frame32.style = "height:300px";
    var strain3 = document.createElement("img");
    strain3.src = "./" + globefnom + "/" + strainname3 + ".png"
    strain3.style = "width:300px";
    strain3.style = "height:300px";
    figure3.appendChild(strain3);
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
        height: 650,
        resizable: true,
        modal: true,
        open: function (event, ui) {
          var imgPath = $(this).data("imgPath");
          $("#image").attr("src", imgPath).width("800px").height("500px");

          $("#image").attr("originalWidth", 800);
          $("#image").attr("originalHeight", 500);

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

      $("#dialog")
        .data("imgPath", $(this).attr("src")) // The important part .data() method
        .dialog("open");
    });
  });
});
