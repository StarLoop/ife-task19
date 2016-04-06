const algorithms = new Map()
const loadAlgorithms = () => {
	for([name, fn] of algorithms){
		let alg = document.createElement('option')
		alg.innerText = name
		alg.value = name
		doms.select.forEach(select => select.appendChild(alg.cloneNode(true)))
	}
}
const copyArray = (orig, copy = []) => {
	if(orig.length == 0) return copy
	copy.push(orig.shift())
	return copyArray(orig, copy)
}
class Env {
	constructor (dataset, area, canvas, flow){
		this.area = area
		this.data = copyArray(dataset)
		this.canvas = canvas
		this._flow = flow
	}
	log (msg, color = 'white') {this.area.innerHTML = `<div style="color: ${color}">${msg}</div>${this.area.innerHTML}`}
	flow (msg, color = 'white') {this._flow.innerHTML = `<div style="color: ${color}">> ${msg}</div>`}
	draw (data) {updateCanvas(this.canvas, data)}
	start () {this.log('开始排序', '#8BC34A')}
	end (t) {this.log(t ? `排序完成，${t} 次操作` : '排序完成', '#8BC34A')}
	display (gen) {
		let count = 0;
		this.__id = setInterval(() => {
			if(gen.next().done) clearInterval(this.__id, this.end(count))
			else gen.next(count ++)
		}, 1)
	}
}

algorithms.set('冒泡算法', env => {
	env.start()
	const bubble = function* (arr){
		for(let i = 0; i < arr.length - 1; i ++)
			for(let j = 0; j < arr.length - 1 - i; j ++)
				if(arr[j] > arr[j + 1]) {
					let temp = arr[j]
					arr[j] = arr[j + 1]
					arr[j + 1] = temp
					
					env.flow(`交换了 ${arr[j]} 和 ${arr[j + 1]}`)					
					env.draw(arr)
					yield
				}
	}
	env.display(bubble(env.data))
})

algorithms.set('鸡尾酒算法', env => {
	env.start()
	const cs = function* (arr){
		let i, left = 0, right = arr.length - 1
		let temp
		while (left < right) {
			for (i = left; i < right; i++) {
				if(arr[i] > arr[i + 1]) {
					temp = arr[i]
					arr[i] = arr[i + 1]
					arr[i + 1] = temp
					env.flow(`交换了 ${arr[i]} 和 ${arr[i + 1]}`)
					env.draw(arr)
					yield
				}
			}
			right --
			for (i = right; i > left; i--) {
				if (arr[i - 1] > arr[i]) {
					temp = arr[i]
					arr[i] = arr[i - 1]
					arr[i - 1] = temp
					env.flow(`交换了 ${arr[i]} 和 ${arr[i - 1]}`)
					env.draw(arr)
					yield
				}
			}
			left ++
		}
	}
	env.display(cs(env.data))	
})

algorithms.set('插入排序', env => {
	env.start()
	const ins = function *(arr){
		let i, j, temp
		for(i = 1; i < arr.length; i++) {
			temp = arr[i]
			for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
				arr[j + 1] = arr[j]
				env.flow(`交换了 ${arr[j]} 和 ${arr[j + i]}`)
				env.draw(arr)
				yield
			}
			arr[j + 1] = temp
		}
	}
	env.display(ins(env.data))
})

algorithms.set('选择排序', env => {
	env.start()
	const sel = function *(arr){
		let i, j, min, temp
		for (i = 0; i < arr.length - 1; i++) {
			min = i;
			for (j = i + 1; j < arr.length; j++) if (arr[min] > arr[j]) min = j
			temp = arr[min]
			arr[min] = arr[i]
			arr[i] = temp
			env.draw(arr)
			yield
		}
	}
	env.display(sel(env.data))
})

algorithms.set('希尔排序', env => {
	env.start()
	const sel = function *(arr){
		let gap, i, j, temp;
		for (gap = arr.length >> 1; gap > 0; gap >>= 1)
			for (i = gap; i < arr.length; i++) {
				temp = arr[i]
				for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap)
					arr[j + gap] = arr[j]
				arr[j + gap] = temp
				env.draw(arr)
				yield
			}
	}
	env.display(sel(env.data))
})