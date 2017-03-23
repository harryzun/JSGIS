import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import json from '../../package.json'

function init() {
	let mainWindow = new BrowserWindow({
		title: json.name,
		width: 699,
		height: 446,
		resizable: false,
		maximizable: false,
		fullscreenable: false,
	})

	mainWindow.setContentSize(699, 446) // addresses maxOS quirk

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '..', '..', 'main.html'),
		protocol: 'file:',
		slashes: true
	}))

	mainWindow.on('closed', () => {
		mainWindow = null
	})
	
	return mainWindow
}

export { init as default }