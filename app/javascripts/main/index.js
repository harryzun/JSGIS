import { app } from 'electron'
import splash from './splash'
import about from './about'
import Point from './Point'

app.on('ready', () => {
//	splash().then((splashWindow) => {
//		console.log('CLOSED');
//		about()
//	})
	about()

	let p1 = new Point(9, 9)
	let p2 = new Point(0, 0)
	console.log(p1.distance(p2))
})