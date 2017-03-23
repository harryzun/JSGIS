import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import json from '../../package.json'

function init(data) {
	let inspectorWindow = new BrowserWindow({
		title: 'Polyline Inspector',
		width: 200,
		height: 400,
		maximizable: false,
		fullscreenable: false,
		show: false
	})

	inspectorWindow.setContentSize(200, 400) // addresses maxOS quirk
	
	inspectorWindow.once('ready-to-show', () => {
		inspectorWindow.webContents.send('new-data', data)
		inspectorWindow.show()
	})

	inspectorWindow.loadURL(url.format({
		pathname: path.join(__dirname, '..', '..', 'inspector.html'),
		protocol: 'file:',
		slashes: true
	}))

	inspectorWindow.on('closed', () => {
		inspectorWindow = null
	})
	
	return inspectorWindow
}

export { init as default }