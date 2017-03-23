import controlClass from './control-class'
import Polyline from './polyline'

let { $_, BaseClass, extendable } = new controlClass({}, { extends: Polyline })

class Test extends BaseClass {
	constructor() {
		super()
	}
}

export default extendable(Test)