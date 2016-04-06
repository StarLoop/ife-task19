/* Utils */
const range = (x, y) => x == y ? x : [x].concat(range(x + 1, y))
const randomBoolean = p => Math.random() > (1 / p)
const repeat = (n, f, arg) => n == 1 ? arg : repeat(n - 1, f, f(arg))
const random = (x, y) => repeat(20, arr => arr.sort((x, y) => randomBoolean(2)), range(x, y))[0]
const $ = selector => Array.prototype.slice.call(document.querySelectorAll(selector))

const btnEvents = {}
const doms = {
	userInput: document.querySelector('[data-value="user-input"]'),
	canvas: $('canvas'),
	select: $('select'),
	area: $('.log'),
	flow: $('.area .top')
}
var dataset = []

/* T18 Code */
btnEvents['left-out'] = () => dataset = dataset.pop()
btnEvents['left-in'] = () => dataset = [doms.userInput.value].concat(dataset)
btnEvents['right-out'] = () => dataset = dataset.shift()
btnEvents['right-in'] = () => dataset.push(doms.userInput.value)

/* Profile */
btnEvents.random = () => dataset = repeat(20, arr => arr.sort((x, y) => randomBoolean(2)), range(10, $('[data-value=num')[0].value))

/* Console */
btnEvents['start'] = () => {
	doms.select.forEach((v, i) =>
		algorithms.get(v.value)(new Env(dataset, doms.area[i], doms.canvas[i], doms.flow[i]))
	)
}

/* Main */
Array.prototype.slice.call(document.getElementsByTagName('button'))
	.forEach(dom => dom.addEventListener('click', () => {
		btnEvents[dom.getAttribute('data-fn')]()
		updateCanvas(doms.canvas, dataset)
	}))

var canvasSize
{
	let wid;
	canvasSize = axis => axis == 'x' ? wid : axis == 'y' ? 200 : new Error('Axis does not exsit')
	const canvasResizer = () => doms.canvas.forEach(canvas => {
		wid = canvas.width = parseInt(window.innerWidth * 0.95)
		canvas.height = 200
		updateCanvas(doms.canvas, dataset)
	})
	canvasResizer()
	window.addEventListener("resize", canvasResizer, false)
}

loadAlgorithms()