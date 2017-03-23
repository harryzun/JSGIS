import controlClass from './control-class'

let { $_, BaseClass, extendable } = new controlClass({
	private: {
		x:			null,
		y:			null,
		name:		'Unnamed Point',
		visited:	false
	}
})

class Point extends BaseClass {
	constructor(x, y, name) {
		super()
		$_(this).x = x
		$_(this).y = y
		if (name) $_(this).name = name
	}

	get x() {
		return $_(this).x
	}

	set x(x) {
		$_(this).x = x
	}

	get y() {
		return $_(this).y
	}

	set y(y) {
		$_(this).y = y
	}
	
	get name() {
		return _name
	}

	set name(name) {
		$_(this).name = name
	}
	
	isVisited() {
		return _visited
	}

	setVisited(visited) {
		$_(this).visited = visited
	}

	toString() {
		return '('+$_(this).x+', '+$_(this).y+')'
	}

	// Distance by coordinate
	distance(x, y) {
		return Math.sqrt(Math.pow($_(this).x-x, 2) + Math.pow($_(this).y-y, 2))
	}

	// Distance by point
	distance(p) {
		return Math.sqrt(Math.pow($_(this).x-p.x, 2) + Math.pow($_(this).y-p.y, 2))
	}
}

export default extendable(Point)