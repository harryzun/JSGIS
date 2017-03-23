import { ipcRenderer } from 'electron'

document.addEventListener('DOMContentLoaded', (event) => {
	var canvas = document.getElementById('canvas')
	var ctx = canvas.getContext('2d')

	canvas.width	= 699
	canvas.height	= 446

	ctx.fillStyle	= 'red'
	ctx.lineWidth	= 1.5
	ctx.strokeStyle	= 'blue'
	ctx.beginPath()

	canvas.addEventListener('click', (event) => {
		console.log(event.clientX, event.clientY)
		ipcRenderer.send('new-point', { x: event.clientX, y: event.clientY })
		ctx.fillRect(event.clientX - 2, event.clientY - 2, 5, 5)
		ctx.lineTo(event.clientX, event.clientY)
		ctx.stroke()
	}, false)
	
	ipcRenderer.on('clear-polyline', (event, message) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.beginPath()
	})
})