import { ipcRenderer } from 'electron'

ipcRenderer.on('splash-text' , function(event, data) {
	console.log(data.splashText)
	document.getElementById('splash-text').innerHTML = data.splashText
})