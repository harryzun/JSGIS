let isPublicAll = {} // true if public false if private
let isStaticAll = {} // false if instanced true if static
let isFinalAll = {} // false if mutable false if final
let staticVars = {}
let instanceTemplate = {}
let instanceVars = new WeakMap()

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
class BaseClass {
	constructor() {
		instanceVars.set(this, Object.assign({}, instanceTemplate))

		// Expose public non-static vars
		for (let n of Object.keys(isPublicAll)) {
			if (isPublicAll[n]) {
				if (!isStaticAll[n]) {
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
}

// Must be called before creating class
function defineClassVars(vars) {
	let varsBuffer = {}
	if ('public' in vars) {
		for (let n of Object.keys(vars.public)) {
			if (vars.public[n] != null && typeof vars.public[n] == 'object' && 'value' in vars.public[n]) varsBuffer[n] = Object.assign({}, vars.public[n], { public: true })
			else varsBuffer[n] = { public: true, value: vars.public[n] }
		}
	}
	if ('private' in vars) {
		for (let n of Object.keys(vars.private)) {
			if (vars.private[n] != null && typeof vars.private[n] == 'object' && 'value' in vars.private[n]) varsBuffer[n] = Object.assign({}, vars.private[n], { public: false })
			else varsBuffer[n] = { public: false, value: vars.private[n] }
		}
	}
	if (Object.keys(varsBuffer).length > 0) vars = varsBuffer

	for (let n of Object.keys(vars)) {
		let v = vars[n]
		if (v.public == null)	v.public	= true	// defaults to public
		if (v.static == null)	v.static	= false	// defaults to instanced (non-static)
		if (v.final == null)	v.final		= false	// defaults to mutable (non-final)
		
		let newVar = v.value
		if (!v.static) instanceTemplate[n] = newVar
		else staticVars[n] = newVar
		
		isPublicAll[n] = v.public
		isStaticAll[n] = v.static
		isFinalAll[n] = v.final
		
		// Internally expose vars to class
		VarHandler.prototype.__defineGetter__(n, function() {
			return instanceVars.get(this._this)[n]
		})
		VarHandler.prototype.__defineSetter__(n, function(v) {
			let varsBuffer, isStatic = isStaticAll[n]
			if (!isStatic) varsBuffer = instanceVars.get(this._this)
			else varsBuffer = staticVars
			
			if (isFinalAll[n] && varsBuffer[n] != null) throw new Error(`The final field ${n} cannot be reassigned`) // check if final
			
			varsBuffer[n] = v
			if (!isStatic) {
				instanceVars.set(this._this, varsBuffer)
			} // no else b/c staticVars was already altered 
		})

		// Expose public static vars
		if (v.public && v.static) {
			BaseClass.__defineGetter__(n, function() {
				return staticVars[n]
			})
			BaseClass.__defineSetter__(n, function(v) {
				if (isFinalAll[n] && staticVars[n] != null) throw new Error(`The final static field ${n} cannot be reassigned`) // check if final
				staticVars[n] = v
			})
		}
	}
}

export { $_, BaseClass, defineClassVars }