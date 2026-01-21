import sqlite3 from "sqlite3"
import path from "path"
import fs from "fs"
import { logger } from "../utils/logger.js"

sqlite3.verbose()

const DATA_DIR = path.join(process.cwd(), process.env.DB_PATH || "data")
const DB_PATH = path.join(DATA_DIR)

let dbInstance = null

export function getDbConnection() {
	if (dbInstance) {
		return dbInstance
	}

	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true })
		logger.info("Carpeta data creada")
	}

	dbInstance = new sqlite3.Database(DB_PATH, err => {
		if (err) {
			logger.error("Error conectando a la BD", err)
			logger.error(DB_PATH)
		} else {
			logger.info("Conexión a BD establecida")
		}
	})

	return dbInstance
}

export function initializeDataBase() {
	const db = getDbConnection()

	const createProfileTableSQL = `
		CREATE TABLE IF NOT EXISTS "profile" (
			"id"	INTEGER,
			"about"	TEXT NOT NULL,
			"bio"	TEXT NOT NULL,
			PRIMARY KEY("id" AUTOINCREMENT)
		);
	`

	const createProjectTableSQL = `
		CREATE TABLE IF NOT EXISTS "project"(
			"id" INTEGER,
			"title" TEXT NOT NULL,
			"description" TEXT NOT NULL,
			"url" TEXT NOT NULL,

			PRIMARY KEY("id" AUTOINCREMENT)
		);
	`

	db.serialize(() => {
		db.run(createProfileTableSQL, err => {
			if (err) {
				logger.error("Error creando la tabla 'Profile'", err)
			} else {
				logger.info("Tabla 'Profile' creada / Verificada correctamente")
			}
		})
	})

	db.serialize(() => {
		db.run(createProjectTableSQL, err => {
			if(err) {
				logger.error("Error creando la tabla 'Project'", err)
			} else {
				logger.info("Tabla 'Project' creada / verificada correctamente")
			}
		})
	})
}

export function closeDbConnection() {
	if (dbInstance) {
		dbInstance.close(err => {
			if (err) {
				logger.error("Error cerrando BD", err)
			} else {
				logger.info("Conexión a BD cerrada")
			}
		})
		dbInstance = null
	}
}
