import controlClass from './control-class'

let { $_, BaseClass, extendable } = new controlClass({
	private: {
		p: null,
		r: null
	}
})

class PointBuffer extends BaseClass {
	constructor(p, r) {
		super()
		$_(this).p = p
		$_(this).r = r
	}
	
	isInside(p) {
		return $_(this).p.distance(p) <= $_(this).r
	}
	
	get center() {
		return $_(this).p
	}
		
	set center(p) {
		$_(this).p = p
	}
	
	getArea() {
		return Math.PI * Math.pow($_(this).r, 2)
	}
	
	getLength() {
		return Math.PI * $_(this).r * 2
	}
	
	get radius() {
		return $_(this).r
	}
	
	set radius(r) {
		$_(this).r = r
	}
}

export default extendable(PointBuffer)