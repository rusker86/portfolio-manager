import express from "express"
import path from "path"
import "dotenv/config"
import { connectDB, initializeDataBase } from "../db/sqliteClient.js"

import routerFront from "../routes/routesFront.js"
import routerAdmin from "../routes/routerAdmin.js"
import routerApi from "../routes/routerApi.js"
import { logger } from "../utils/logger.js"

const app = express()
const PORT = process.env.PORT || 3000


app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "view"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), "public")))


async function startServer() {
	try {
		try {
			await connectDB()
			logger.info("Base de datos conectada")
		} catch (dbError) {
			logger.warn("Error conectando base de datos:", dbError.message)
			logger.info("Continuando sin base de datos inicializada...")
		}

		app.use("/", routerFront)
		app.use("/admin", routerAdmin)
		app.use("/api", routerApi)
		
		app.use((req, res) => {
			res.status(404).json({ message: "Ruta no encontrada" })
		})

		const server = app.listen(PORT, () => {
			logger.info(`Servidor escuchando en localhost:${PORT}`)
		})

	} catch(err) {
		app.use((err, req, res, next) => {
			logger.error("Error global:", err)
			res.status(500).json({ message: "Error interno del servidor" })
		})
	}
}

startServer()
initializeDataBase()


// Graceful shutdown
process.on("SIGTERM", () => {
	logger.info("SIGTERM recibido, cerrando servidor...")
	server.close(() => {
		logger.info("Servidor cerrado")
		closeDbConnection()
		process.exit(0)
	})
})
