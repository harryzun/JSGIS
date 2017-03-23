import controlClass from './control-class'

let { $_, BaseClass, extendable } = new controlClass({
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
	
	// Removes all points in polyline
	clearPoints() {
		$_(this).points = []
	}
	
	// Converts polyine to string
	toString() {
		let strings = []
		for (let point of $_(this).points) {
			strings.push(point.toString())
		}
		return 'POLYLINE ['+strings.join(', ')+']'
	}
	
	// Converts polyine to generic object
	toGeneric() {
		let points = []
		for (let point of $_(this).points) {
			points.push(point.toGeneric())
		}
		return Object.assign({}, points)
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