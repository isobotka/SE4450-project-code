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
			alert('Error ' + error)
			console.error(error)
		})
}