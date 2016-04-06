const drawRect = canvas => (color, x, y, width, height) => {
	canvas.fillStyle = color
	canvas.fillRect(x, y, width, height)
}
const randomColor = () => '#999'//'#F44336,#E91E63,#9C27B0,#2196F3,#03A9F4,#00BCD4,#009688,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722'.split(',')[random(0, 12)]

var updateCanvas = (c, dataset) => {
	if(Array.isArray(c)) return c.forEach(canvas => updateCanvas(canvas, dataset))
	
	let context = c.getContext('2d')
	let draw = drawRect(context)
	
	draw('white', 0, 0, canvasSize('x'), canvasSize('y'))
	
	let max = Math.max(...dataset)
	dataset.forEach((value, index) => {
		let y = value / max * canvasSize('y')
		draw(randomColor(), canvasSize('x') / dataset.length * index, canvasSize('y') - y, canvasSize('x') / dataset.length, y)
	})
}