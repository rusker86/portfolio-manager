import express from "express"
import path from "path"
import { logger } from "../utils/logger.js"

const routerAdmin = express()

routerAdmin.set("view engine", "ejs")
routerAdmin.set("views", path.join(process.cwd(), "view"))

routerAdmin.get("/panel", (req, res) => {
	try {
		res.render("admin")
	} catch (error) {
		logger.error("Error en GET /admin/panel", error)
		res.status(500).send("Error cargando el panel de administración")
	}
})

export default routerAdmin
