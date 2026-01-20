export function validateProfileInput(req, res, next) {
	const { about, bio } = req.body

	if (!about || !bio) {
		return res.status(400).json({
			message: "La descripción y la bio son obligatorias"
		})
	}

	if (typeof about !== 'string' || typeof bio !== 'string') {
		return res.status(400).json({
			message: "La descripción y la bio deben ser texto"
		})
	}

	if (about.trim().length < 10) {
		return res.status(400).json({
			message: "La descripción debe tener al menos 10 caracteres"
		})
	}

	if (bio.trim().length < 5) {
		return res.status(400).json({
			message: "La bio debe tener al menos 5 caracteres"
		})
	}

	next()
}
