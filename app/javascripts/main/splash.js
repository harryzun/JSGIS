import path from 'path'
import url from 'url'
import { BrowserWindow } from 'electron'
import json from '../../package.json'
import sleep from './sleep'

function init() {
	return new Promise((resolve, reject) => {
		let splashWindow = new BrowserWindow({
			title: json.name,
			width: 456,
			height: 270,
			frame: false,
			resizable: false,
			minimizable: false,
			maximizable: false,
			fullscreenable: false,
			alwaysOnTop: true,
		})

		let splashes = [
			'Initializing License…',
			'Mailing a Letter to Ezri to Verify License…',
			'Taking a Nap…',
			'Initializing Application…'
		]

		splashWindow.loadURL(url.format({
			pathname: path.join(__dirname, '..', '..', 'splash.html'),
			protocol: 'file:',
			slashes: true
		}))

		splashWindow.webContents.on('did-finish-load', () => {
			let i = 0
			function splashLoop() {
				console.log(splashes[i])
				splashWindow.webContents.send('splash-text', { splashText: splashes[i] })
				if (++i < splashes.length) setTimeout(splashLoop, (splashes.length + 2) * 1000 / (i + 1))
				else setTimeout(() => {
					splashWindow.hide()
					resolve(splashWindow)
				}, 1000)
			}
			splashLoop()
		})

		splashWindow.on('closed', () => {
			splashWindow = null
		})
	})
}

export { init as default }