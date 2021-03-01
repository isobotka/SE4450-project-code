function uploadData() {

	var fileUpload = document.getElementById('uploadedFile');

	const files = fileUpload.files

	const formData = new FormData()
	formData.append('myFile', files[0])


	fetch('http://localhost:8080/upload', {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			alert('File is uploaded successfully and is saved under ' + data.path)

			console.log(data.path)
		})
		.catch(error => {
			alert('ERROR: ' + error)
			console.error(error)
		})

}

var output = [(2,8,0.9),(3,10,0.84),(3,15,0.8),(4,15,0.73),(6,21,0.66)];

// function displayResults(output) {
// 	var results = document.getElementById('results');
// 	var tableBody = document.createElement('tbody');

// 	output.forEach(function(rowData) {
// 		var row = document.createElement('tr');

// 		rowData.forEach(function(cellData) {
// 			var cell = document.createElement('td');
// 			cell.appendChild(document.createTextNode(cellData));
// 			row.appendChild(cell);
// 		});
		
// 		tableBody.appendChild(row);
// 	});

// 		results.appendChild(tableBody);
// 		document.tableBody.appendChild(results);
// 	}

// 	displayResults([["row1, rank", "row1, frame1", "row1, frame2", "row1, probability"], ["row2, rank", "row2, frame1", "row2, frame2", "row2, probability"]]);