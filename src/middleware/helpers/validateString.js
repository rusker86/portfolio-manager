function isNonEmptyString(value) {
	return value.trim() !== ""
}

function hadMinLen(value, len) {
	return value.trim().length >= len
}

function isTypeString(value) {
	return typeof value === "string"
}

function isURLValid(value) {
	try {
		const url = new URL(value)
		return true
	} catch(err) {
		return false
	}
}

export { isNonEmptyString, hadMinLen, isTypeString, isURLValid }
