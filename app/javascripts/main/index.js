import { app } from 'electron'
import splash from './splash'
import about from './about'
import Point from './Point'
import Test from './Test'

app.on('ready', () => {
//	splash().then((splashWindow) => {
//		console.log('CLOSED');
//		about()
//	})
//	about()

	let p1 = new Point(9, 9)
	console.log(p1.toString())
	console.log(Point.foo)
	console.log(Test.foo)
})