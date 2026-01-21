import {
	isNonEmptyString,
	hadMinLen,
	isTypeString,
	isURLValid
} from "./helpers/validateString.js"

import { sendError } from "./helpers/sendError.js"

export function validateProject(req, res, next) {
	const MIN_LENGTH_TITLE = 10
	const MIN_LENGTH_DESCRIPTION = 20

	const { title, description, url } = req.body


	if(!isNonEmptyString(title) || !isNonEmptyString(description)) {
		return sendError(res, "El título y la descripción son obligatorios")
	}

	if(!isTypeString(title) || !isTypeString(description)) {
		return sendError(res, "El tipo de dato debe ser un string")
	}

	if(hadMinLen(title, MIN_LENGTH_TITLE)) {
		return sendError(res, `La longitud mínima de caracteres del título debe ser de ${MIN_LENGTH_TITLE}`)
	}

	if(!hadMinLen(description, MIN_LENGTH_DESCRIPTION)) {
		return sendError(res, `La longitud mínima de caracteres de la descripción debe ser de ${MIN_LENGTH_DESCRIPTION}`)
	}

	if(!isURLValid(url)) {
		return sendError(res, "La url no es válida")
	}
	
	next()
}