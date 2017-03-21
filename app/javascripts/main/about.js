import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import json from '../../package.json'
import sleep from './sleep'

function init() {
	return new Promise((resolve, reject) => {
		let aboutWindow = new BrowserWindow({
			title: json.name,
			width: 456,
			height: 270,
			resizable: false,
			minimizable: false,
			maximizable: false,
			fullscreenable: false,
			alwaysOnTop: true,
		})

		aboutWindow.setContentSize(456, 270) // addresses maxOS quirk

		aboutWindow.loadURL(url.format({
			pathname: path.join(__dirname, '..', '..', 'about.html'),
			protocol: 'file:',
			slashes: true
		}))

		aboutWindow.on('closed', () => {
			aboutWindow = null
			resolve()
		})
	})
}

export { init as default }