import { app } from 'electron'
import splash from './splash'
import about from './about'
import Point from './point'


app.on('ready', () => {
//	splash().then((splashWindow) => {
//		console.log('CLOSED');
//		about()
//	})
//	about()

	let p1 = new Point(9, 9)
	console.log(p1.toString())
})