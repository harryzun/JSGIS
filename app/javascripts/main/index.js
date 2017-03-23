import { app } from 'electron'
import splash from './splash'
import about from './about'
import Point from './point'
import PointBuffer from './point-buffer'
import Polyline from './polyline'
import Test from './test'

app.on('ready', () => {
//	splash().then((splashWindow) => {
//		console.log('CLOSED');
//		about()
//	})
//	about()

	let p1 = new Point(0, 0)
	let p2 = new Point(0, 5)
	let pb = new PointBuffer(p1, 4)
	console.log(pb.isInside(p2))
	
	let t = new Test()
	console.log(t.foo)
})