export function validateProject(req, res, next) {
	const MIN_LENGTH_TITLE = 10
	const MIN_LENGTH_DESCRIPTION = 20

	const { title, description } = req.body


	if(!title || !description) {
		return res.status(400).json({
			message: "El título o la descripción son obligatorios"
		})
	}

	if(typeof title !== "string" || typeof description !== "string") {
		return res.status(400).json({
			message: "El tipo de dato debe ser un string"
		})
	}

	if(title.trim().length < MIN_LENGTH_TITLE) {
		return res.status(400).json({
			message: 
				`La longitud mínima de caracteres del título debe ser de ${MIN_LENGTH_TITLE}`
		})
	}

	if(description.trim().length < MIN_LENGTH_DESCRIPTION) {
		return res.status(400).json({
			messsage:
				`La longitud mínima de caracteres de la descripción debe ser de ${MIN_LENGTH_DESCRIPTION}`
		})
	}
	
	next()
}