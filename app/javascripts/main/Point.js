class Point {
	constructor(x, y, name = 'Unnamed Point') {
		this._x = x
		this._y = y
		this._name = name
		this._visited = false
	}

	get x() {
		return this._x
	}

	set x(x) {
		this._x = x
	}

	get y() {
		return this._y
	}

	set y(y) {
		this._y = y
	}
	
	get name() {
		return _name
	}

	set name(name) {
		this._name = name
	}
	
	isVisited() {
		return _visited
	}

	setVisited(visited) {
		this._visited = visited
	}

	toString() {
		return '('+_x+', '+_y+')'
	}

	// Distance by coordinate
	distance(x, y) {
		return Math.sqrt(Math.pow(this._x-x, 2) + Math.pow(this._y-y, 2))
	}

	// Distance by point
	distance(p) {
		return Math.sqrt(Math.pow(this._x-p.x, 2) + Math.pow(this._y-p.y, 2))
	}
}

export { Point as default }