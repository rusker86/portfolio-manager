import express from "express"
import path from "path"
import "dotenv/config"
import { initializeDataBase, closeDbConnection } from "../db/sqliteClient.js"

import routerFront from "../routes/routesFront.js"
import routerAdmin from "../routes/routerAdmin.js"
import routerApi from "../routes/routerApi.js"
import { logger } from "../utils/logger.js"

const app = express()
const PORT = process.env.PORT || 3000

// Inicializar BD
initializeDataBase()

app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "view"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), "public")))

app.use("/", routerFront)
app.use("/admin", routerAdmin)
app.use("/api", routerApi)

// Manejo de rutas no encontradas
app.use((req, res) => {
	res.status(404).json({ message: "Ruta no encontrada" })
})

// Manejo de errores global
app.use((err, req, res, next) => {
	logger.error("Error global:", err)
	res.status(500).json({ message: "Error interno del servidor" })
})

const server = app.listen(PORT, () => {
	logger.info(`Servidor escuchando en localhost:${PORT}`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
	logger.info("SIGTERM recibido, cerrando servidor...")
	server.close(() => {
		logger.info("Servidor cerrado")
		closeDbConnection()
		process.exit(0)
	})
})
