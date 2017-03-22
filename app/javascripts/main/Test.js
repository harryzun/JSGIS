import { $_, BaseClass, defineClassVars } from './class-polyfill'

defineClassVars({
	public: {
		foo: {
			static: true,
			value: 'TestClass'
		}
	}
})

class Test extends BaseClass {
	constructor() {
		super()
	}
}

export { Test as default }