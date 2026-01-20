import express from "express"
import path from "path"

import {
	handleCreateProfile,
	handleGetAllProfiles,
	handleGetLastProfile,
	handleGetProfileById
} from "../controller/controllerProfile.js"
import { logger } from "../utils/logger.js"

const routerFront = express()

routerFront.set("view engine", "ejs")
routerFront.set("views", path.join(process.cwd(), "view"))

routerFront.get("/", async (req, res) => {
	try {
		const lastProfile = await handleGetLastProfile()

		res.render("portfolio/index", {
			about: lastProfile?.about || "",
			bio: lastProfile?.bio || ""
		})
	} catch (error) {
		logger.error("Error en GET /", error)
		res.status(500).send("Error cargando el perfil")
	}
})

export default routerFront
