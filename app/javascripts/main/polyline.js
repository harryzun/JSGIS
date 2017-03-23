import controlClass from './control-class'

let { $_, BaseClass, extendable } = new controlClass({
	public: {
		foo: 'bar'
	},
	private: {
		points: [],
		nearRadius: 10
	}
})

class Polyline extends BaseClass {
	constructor() {
		super()
	}

	get polyline() {
		return $_(this).points
	}
	
	// Adds point to polyline
	addPoint(p) {
		$_(this).points.push(p)
	}
	
	// Sets first point of polyline
	setFirst(p) {
		$_(this).points[0] = p
	}
	
	// Returns first point of polyline
	getFirst() {
		return $_(this).points[0]
	}
	
	// Sets last point of polyline
	setLast(p) {
		$_(this).points[points.length - 1] = p
	}

	// Returns last point of polyline
	getLast() {
		return $_(this).points[points.length - 1]
	}
	
	// Returns amount of points in polyline
	getPointCount() {
		return $_(this).points.length
	}
	
	// Returns length of polyline
	getLength() {
		let distance = 0
		let lastPoint = false
		for (let point of $_(this).points) {
			if (lastPoint)
				distance += lastPoint.distance(point)
			lastPoint = point
		}
		return distance
	}
	
//	// Draws polyline
//	public void draw(Graphics g) {
//		Iterator<Point> pointIterator = points.iterator();
//    	g.setColor(Color.BLUE);
//		if (pointIterator.hasNext()) {
//			Point lastP = pointIterator.next();
//			g.fillOval((int) lastP.getX() - 3, (int) lastP.getY() - 3, 6, 6);
//			while (pointIterator.hasNext()) {
//				Point p = pointIterator.next();
//				g.fillOval((int) p.getX() - 3, (int) p.getY() - 3, 6, 6);
//				g.drawLine(
//					(int) lastP.getX(), 
//					(int) lastP.getY(), 
//					(int) p.getX(), 
//					(int) p.getY()
//				);
//				lastP = p;
//			}
//		}
//	}
	
	// Check point is near
	isNear(checkPoint) {
		for (let point of $_(this).points) {
			let pb = new PointBuffer(point, $_(this).nearRadius)
			if (pb.isInside(checkPoint)) return true
		}
		return false
	}
}

export default extendable(Polyline)