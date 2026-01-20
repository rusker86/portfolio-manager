import sqlite3 from "sqlite3"
import path from "path"
import fs from  "fs"

sqlite3.verbose()

const DATA_DIR = path.join(process.cwd(), "data")
const DB_PATH = path.join(DATA_DIR, "dataBase.db")

export function createDbConnection() {
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true })
		console.log("Carpeta data creada")
	}

	const db = new sqlite3.Database(DB_PATH, err => {
		if(err) { console.error(err) }
		else { console.log("Conexión abierta") }
	})

	return db
}

export function initializeDataBase(db) {
	const createShopTableSQL = `
		CREATE TABLE IF NOT EXISTS "profile" (
			"id"	INTEGER,
			"about"	TEXT NOT NULL,
			"bio"	TEXT NOT NULL,
			PRIMARY KEY("id" AUTOINCREMENT)
		);
	`

	db.serialize(() => {
		db.run(createShopTableSQL, err => {
			if(err) { console.error("Error creando la tabla 'Profile'") }
			else { console.log("Tabla 'Profile' creada / Verificada correctamente") }
		})
	})
}
