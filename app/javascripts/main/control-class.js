let extendVars = new WeakMap() // stores 'vars' variable for subclass and links it to parent class name
export default (vars, options = {}) => {
	let superClass = options.extends	// set superclass from options
	let publicLedger = {}				// true if public false if private
	let staticLedger = {}				// false if instanced true if static
	let finalLedger = {}				// false if mutable false if final
	let staticVars = {}					// stores static variables for access
	let instanceTemplate = {}			// stores instance variables before assigned to a class
	let instanceVars = new WeakMap()	// stores instance variables for access
	let extendTemplate = {}				// stores 'vars' variable for subclass before extendable is called

	// Check for superClass variables
	if (superClass) {
		let extendVarsBuffer = extendVars.get(superClass)
		if (extendVarsBuffer) {
			extendTemplate = extendVarsBuffer
		} else
			superClass = class {}
	} else {
		superClass = class {}
	}

	// Used to access vars (internally)
	class VarHandler {
		constructor(_this) {
			this._this = _this
		}
	}

	// Wrapper for VarHandler
	function $_(_this) {
		return new VarHandler(_this)
	}

	// Must be extended to use expose vars
	class BaseClass extends superClass {
		constructor() {
			super()
			instanceVars.set(this, Object.assign({}, instanceTemplate))

			// Expose public non-static vars
			for (let n of Object.keys(publicLedger)) {
				if (publicLedger[n] && !staticLedger[n]) {
					BaseClass.prototype.__defineGetter__(n, function() {
						return $_(this)[n]
					})
					BaseClass.prototype.__defineSetter__(n, function(v) {
						$_(this)[n] = v
					})
				}
			}
		}
	}

	// Must be called before creating class
	function defineClassVars(vars) {
		// Restructure vars from: { public: { varName: options } } to: { varName: options }
		let varsBuffer = {}
		if ('public' in vars) {
			for (let n of Object.keys(vars.public)) {
				if (Object.keys(varsBuffer).length > 0 && n in varsBuffer) // Check for duplicate variable names
					throw new Error(`The field '${n}' cannot be redeclared`)
				if (vars.public[n] != null && typeof vars.public[n] == 'object' && 'value' in vars.public[n])
					varsBuffer[n] = Object.assign({}, vars.public[n], { public: true })
				else
					varsBuffer[n] = { public: true, value: vars.public[n] }
			}
		}
		if ('private' in vars) {
			for (let n of Object.keys(vars.private)) {
				if (Object.keys(varsBuffer).length > 0 && n in varsBuffer) // Check for duplicate variable names
					throw new Error(`The field '${n}' cannot be redeclared`)
				if (vars.private[n] != null && typeof vars.private[n] == 'object' && 'value' in vars.private[n])
					varsBuffer[n] = Object.assign({}, vars.private[n], { public: false })
				else
					varsBuffer[n] = { public: false, value: vars.private[n] }
			}
		}
		if (Object.keys(varsBuffer).length > 0) vars = varsBuffer

		// Check for duplicate variable names
		if (Object.keys(extendTemplate).length > 0) {
			varsBuffer = {}
			for (let n of Object.keys(extendTemplate)) {
				if (Object.keys(vars).length > 0 && n in vars)
					throw new Error(`The field '${n}' cannot be redeclared`)
				if (Object.keys(varsBuffer).length > 0 && n in varsBuffer)
					throw new Error(`The field '${n}' cannot be redeclared`)
				varsBuffer[n] = extendTemplate[n]
			}
		}

		vars = Object.assign({}, vars, extendTemplate)	// Merge extendTemplate with vars
		extendTemplate = Object.assign({}, vars)		// Prepare extendTemplate for next subclass 

		// Iterate each of the variables to be created
		for (let n of Object.keys(vars)) {
			let v = vars[n]
			if (v.public == null)	v.public	= true	// defaults to public
			if (v.static == null)	v.static	= false	// defaults to instanced (non-static)
			if (v.final == null)	v.final		= false	// defaults to mutable (non-final)

			let newVar = v.value
			if (!v.static) instanceTemplate[n] = newVar // add static variable to static var object
			else staticVars[n] = newVar // add static variable to static var object

			publicLedger[n] = v.public
			staticLedger[n] = v.static
			finalLedger[n] = v.final

			// Internally expose vars to class
			VarHandler.prototype.__defineGetter__(n, function() {
				if (staticLedger[n])
					return staticVars[n]
				else
					return instanceVars.get(this._this)[n]
			})
			VarHandler.prototype.__defineSetter__(n, function(v) {
				let varsBuffer, isStatic = staticLedger[n]
				if (!isStatic) varsBuffer = instanceVars.get(this._this)
				else varsBuffer = staticVars

				if (finalLedger[n] && varsBuffer[n] != null) // check if final
					throw new Error(`The final field '${n}' cannot be reassigned`)

				varsBuffer[n] = v
				if (!isStatic)
					instanceVars.set(this._this, varsBuffer)
				// no else b/c staticVars was already altered 
			})

			// Expose public static vars
			if (v.public && v.static) {
				BaseClass.prototype.__defineGetter__(n, function() {
					return staticVars[n]
				})
				BaseClass.prototype.__defineSetter__(n, function(v) {
					if (finalLedger[n] && staticVars[n] != null) // check if final
						throw new Error(`The final static field '${n}' cannot be reassigned`)
					staticVars[n] = v
				})
				BaseClass.__defineGetter__(n, function() {
					return staticVars[n]
				})
				BaseClass.__defineSetter__(n, function(v) {
					if (finalLedger[n] && staticVars[n] != null) // check if final
						throw new Error(`The final static field '${n}' cannot be reassigned`)
					staticVars[n] = v
				})
			}
		}
	}

	// Must be called before extending BaseClass's subclass
	function extendable(SuperClass) {
		extendVars.set(SuperClass, Object.assign({}, extendTemplate))
		return SuperClass
	}

	defineClassVars(vars)
	return { $_, BaseClass, extendable }
}