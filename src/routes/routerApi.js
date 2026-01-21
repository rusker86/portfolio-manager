import express from "express"
import multer from "multer"
import fs from "fs"
import path from "path"

import { handleCreateProfile } from "../controller/controllerProfile.js"

import { validateProfileInput } from "../middleware/validateProfile.js"
import { validateProject } from "../middleware/validateProject.js"

import { logger } from "../utils/logger.js"
import { fileURLToPath } from "url"

const routerApi = express()

const upload = multer({ dest: "uploads/" })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

routerApi.post("", validateProject, async (req, res) => {
	//TODO: Crear inserción de proyectos
})

routerApi.post("/upload-file", upload.single("file"), (req, res) => {
	const { field } = req.body
	const file = req.file

	if(!file || !field) { return res.status(400).json({ message: "Falta archivo o campo" }) }

	const publicDir = path.join(__dirname, "../../public")

	if(!fs.existsSync(publicDir)) {
		fs.mkdirSync(destPath, { recursive: true })
	}

	let fileName

	if(field === "profileImage") { fileName = "photo.jpeg" }
	else if(field === "cvFile") fileName = "cv.pdf"
	else {
		return res.status(400).json({ message: "Campo no permitido "})
	}

	const destPath = path.join(publicDir, fileName)

	fs.rename(file.path, destPath, err => {
		if(err) {
			logger.error("Error guardando el archivo", err)
			return res.status(500).json({ message: err.message })
		}

		res.json({ message: "Archivo subido con éxito" })
	})
})

export default routerApi
