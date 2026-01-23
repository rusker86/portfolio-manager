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

const routerFront = express()

routerFront.set("view engine", "ejs")
routerFront.set("views", path.join(process.cwd(), "view"))

routerFront.get("/", async (req, res) => {
	try {
		const lastProfile = await handleGetLastProfile()

		if (!lastProfile) {
			return res.status(404).render("portfolio/404")
		}

		res.render("portfolio/index", {
			about: lastProfile?.about || "",
			bio: lastProfile?.bio || ""
		})
	} catch (error) {
		logger.error("Error en GET /", error)
		res.status(500).render("portfolio/500")
	}
})

export default routerFront
