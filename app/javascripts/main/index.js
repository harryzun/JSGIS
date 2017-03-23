import { app, ipcMain, Menu } from 'electron'
import splash from './splash'
import main from './main'
import inspector from './inspector'
import about from './about'
import Point from './point'
import Polyline from './polyline'

app.on('ready', () => {
	const template = [
		{
			label: 'JSGIS',
			submenu: [
				{
					label: 'About',
					click: () => {
						about()
					}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Clear Polyline',
					click: () => {
						pl.clearPoints()
						mainWindow.webContents.send('clear-polyline', true)
						if (inspectorWindow) inspectorWindow.webContents.send('new-data', JSON.stringify(pl.toGeneric(), null, 4))
					}
				}
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'View Polyline Data',
					click: () => {
						inspectorWindow = inspector(JSON.stringify(pl.toGeneric(), null, 4))
					}
				}
			]
		}
	]
	
	const menu = Menu.buildFromTemplate(template)

	let pl = new Polyline()
	let inspectorWindow = null
	let mainWindow

	ipcMain.on('new-point', (event, { x, y }) => {
		let p = new Point(x, y)
		pl.addPoint(p)
		if (inspectorWindow) inspectorWindow.webContents.send('new-data', JSON.stringify(pl.toGeneric(), null, 4))
	})

	splash().then((splashWindow) => {
		Menu.setApplicationMenu(menu)
		mainWindow = main()
	})
})