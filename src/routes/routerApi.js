import express from "express"

import {
	handleCreateProfile,
	handleGetAllProfiles,
	handleGetLastProfile,
	handleGetProfileById
} from "../controller/controllerProfile.js"
import { validateProfileInput } from "../middleware/validateProfile.js"
import { logger } from "../utils/logger.js"

const routerApi = express()

routerApi.post("/create-profile", validateProfileInput, async (req, res) => {
	const { about, bio } = req.body

	try {
		const profile = await handleCreateProfile({ about, bio })
		res.status(201).json({
			message: "Perfil creado correctamente",
			data: profile
		})
	} catch (error) {
		logger.error("Error en POST /api/create-profile", error)
		res.status(500).json({ message: "Error al guardar el perfil" })
	}
})

export default routerApi
