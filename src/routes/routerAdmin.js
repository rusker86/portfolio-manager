import express from "express"
import path from "path"

import {
	handleCreateProfile,
	handleGetAllProfiles,
	handleGetLastProfile,
	handleGetProfileById
} from "../controller/controllerProfile.js"
import { createLogger } from "logger"

const logger = createLogger({logFilePath: "Logs"})

const routerAdmin = express()

routerAdmin.set("view engine", "ejs")
routerAdmin.set("views", path.join(process.cwd(), "view"))

routerAdmin.get("/panel", async (req, res) => {
	try {
		const lastProfile = await handleGetLastProfile()

		res.render("admin", {
			bio: lastProfile.bio || "",
			about: lastProfile.about || ""
		})
	
	} catch (error) {
		logger.error("Error en GET /admin/panel", error)
		res.status(500).send("Error cargando el panel de administración")
	}
})

export default routerAdmin
