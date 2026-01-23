import sqlite3 from "sqlite3"
import path from "path"
import fs from "fs"
import { createLogger } from "logger"

const logger = createLogger({logFilePath: "Logs"})

sqlite3.verbose()

const DATA_DIR = path.join(process.cwd(), process.env.DB_PATH || "data")
const DB_PATH = path.join(DATA_DIR)

let db = null

export function connectDB() {
	
	return new Promise((resolve, reject) => {

		const dbPath = "src/data/dataBase.db"
		db = new sqlite3.Database("src/data/dataBase.db", err => {
			err ? reject(err) : resolve(db)
		})
	})
}


export function getDB() {
	if(!db) {
		const error = new Error("Base de datos no inicializada")
		error.statusCode = 500
		throw error
	}
	return db
}


export function initializeDataBase() {

	const db = getDB()

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
