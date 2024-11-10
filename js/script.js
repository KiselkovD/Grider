function createTable() {
	var RowNum = document.getElementById('numberInput-h').value
	var ColumnNum = document.getElementById('numberInput-v').value

	const canvas = document.getElementById('container')
	var true_img = document.getElementById('true-img')
	canvas.width = true_img.width
	canvas.height = true_img.height
	var ctx = canvas.getContext('2d')

	//clear canvas and draw grid
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.beginPath()
	var gridSize = canvas.width / RowNum
	for (var x = 0; x <= canvas.width; x += gridSize) {
		ctx.moveTo(x, 0)
		ctx.lineTo(x, canvas.height)
	}
	var gridSize = canvas.height / ColumnNum
	for (var y = 0; y <= canvas.height; y += gridSize) {
		ctx.moveTo(0, y)
		ctx.lineTo(canvas.width, y)
	}
	ctx.strokeStyle = '#000000'
	ctx.stroke()
}

// if number of columns or rows change, then canvas will be redrawn
document.getElementById('numberInput-v').addEventListener('change', createTable)
document.getElementById('numberInput-h').addEventListener('change', createTable)

function loadImage(event) {
	const file = event.target.files[0]
	const reader = new FileReader()
	reader.onload = function (e) {
		const img = new Image()
		img.src = e.target.result

		// when file read and img load add img src to show it
		img.onload = function () {
			document.getElementById(
				'img'
			).innerHTML = `<img id="true-img" src="${img.src}">`

			document.getElementById('doWork').style.display = 'inline'
		}
	}
	reader.readAsDataURL(file)
}

function cutAndSetDownloadLinks() {
	var RowNum = document.getElementById('numberInput-h').value
	var ColumnNum = document.getElementById('numberInput-v').value
	const img = new Image()
	img.src = document.getElementById('true-img').src
	img.onload = function () {
		Canvas_width = img.width / RowNum
		Canvas_height = img.height / ColumnNum

		// cutting into parts with drawImage in NewCanvas
		for (var y = 0; y < ColumnNum; y += 1) {
			for (var x = 0; x < RowNum; x += 1) {
				const NewCanvas = document.createElement('canvas')
				document.getElementById('output-part').appendChild(NewCanvas)
				const NewCtx = NewCanvas.getContext('2d')
				NewCanvas.width = Canvas_width
				NewCanvas.height = Canvas_height
				NewCtx.drawImage(
					img,
					Canvas_width * x,
					Canvas_height * y,
					Canvas_width,
					Canvas_height,
					0,
					0,
					Canvas_width,
					Canvas_height
				)

				// add URLs
				NewCanvas.onclick = function () {
					downloadImage(NewCanvas.toDataURL(), 'part.png')
				}
			}

			// add empty div to line break
			document
				.getElementById('output-part')
				.appendChild(document.createElement('div'))
		}
	}
}

function downloadImage(dataUrl, filename) {
	const link = document.createElement('a')
	link.href = dataUrl
	link.download = filename
	link.click()
}
