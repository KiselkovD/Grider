function createTable() {
	var RowNum = document.getElementById('numberInput-h').value
	var ColumNum = document.getElementById('numberInput-v').value

	const canvas = document.getElementById('container')
	var true_img = document.getElementById('true-img')
	canvas.width = true_img.width
	canvas.height = true_img.height
	var ctx = canvas.getContext('2d')
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.beginPath()
	var gridSize = canvas.width / RowNum
	for (var x = 0; x <= canvas.width; x += gridSize) {
		ctx.moveTo(x, 0)
		ctx.lineTo(x, canvas.height)
	}
	var gridSize = canvas.height / ColumNum
	for (var y = 0; y <= canvas.height; y += gridSize) {
		ctx.moveTo(0, y)
		ctx.lineTo(canvas.width, y)
	}
	ctx.strokeStyle = '#000000' // Цвет линий
	ctx.stroke()
}
document.getElementById('numberInput-v').addEventListener('change', createTable)
document.getElementById('numberInput-h').addEventListener('change', createTable)
// Функция загрузки изображения
function loadImage(event) {
	const file = event.target.files[0] // Получаем выбранный файл
	const reader = new FileReader() // Создаем новый объект FileReader
	reader.onload = function (e) {
		const img = new Image() // Создаем новый элемент изображения
		img.src = e.target.result // Устанавливаем источник изображения
		img.onload = function () {
			document.getElementById(
				'img'
			).innerHTML = `<img id="true-img" src="${img.src}">`
			// Показываем кнопки для скачивания

			document.getElementById('doWork').style.display = 'inline'

			// Устанавливаем ссылки для скачивания половинок изображения
		}
	}
	reader.readAsDataURL(file) // Читаем файл как Data URL
}

// Функция для установки ссылок на скачивание половинок изображения
function setDownloadLinks() {
	var RowNum = document.getElementById('numberInput-h').value
	var ColumNum = document.getElementById('numberInput-v').value
	const img = new Image()
	img.src = document.getElementById('true-img').src
	img.onload = function () {
		Canvas_width = img.width / RowNum
		Canvas_height = img.height / ColumNum
		/*alert(`RowNum ${RowNum} ColumNum ${ColumNum}`)*/
		for (var y = 0; y < ColumNum; y += 1) {
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
				NewCanvas.onclick = function () {
					downloadImage(NewCanvas.toDataURL(), 'part.png')
				}
			}
			document.getElementById('output-part').appendChild(document.createElement('div'))
		}
	}
}

// Функция для скачивания изображения по Data URL
function downloadImage(dataUrl, filename) {
	const link = document.createElement('a') // Создаем элемент ссылки
	link.href = dataUrl // Устанавливаем адрес ссылки на Data URL
	link.download = filename // Устанавливаем имя файла для скачивания
	link.click() // Имитируем клик по ссылке для начала скачивания
}
