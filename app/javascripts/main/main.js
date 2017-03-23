import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import json from '../../package.json'

function init() {
	let mainWindow = new BrowserWindow({
		title: json.name,
		width: 456,
		height: 270,
		resizable: false,
		minimizable: false,
		maximizable: false,
		fullscreenable: false,
		alwaysOnTop: true,
	})

	mainWindow.setContentSize(456, 270) // addresses maxOS quirk

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '..', '..', 'main.html'),
		protocol: 'file:',
		slashes: true
	}))

	mainWindow.on('closed', () => {
		mainWindow = null
		resolve()
	})
	
	return mainWindow
}

export { init as default }