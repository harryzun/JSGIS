import { ipcRenderer } from 'electron'

ipcRenderer.on('new-data', (event, data) => {
	document.getElementById('data-box').innerHTML = data
})