import { getDbConnection } from "../db/sqliteClient.js"
import { logger } from "../utils/logger.js"

export function createProfile({ about, bio }) {
	const db = getDbConnection()

	const sql = `
		INSERT INTO profile(about, bio)
		VALUES (?, ?);
	`

	return new Promise((resolve, reject) => {
		db.run(sql, [about, bio], function(err) {
			if (err) {
				logger.error("Error insertando perfil", err)
				reject(err)
			} else {
				const newProfile = {
					id: this.lastID,
					about,
					bio
				}

				logger.info(`Perfil creado con ID: ${this.lastID}`)
				resolve(newProfile)
			}
		})
	})
}

export function getAllProfiles() {
	const db = getDbConnection()

	const sql = `
		SELECT *
		FROM profile
		ORDER BY id ASC;
	`

	return new Promise((resolve, reject) => {
		db.all(sql, [], (err, rows) => {
			if (err) {
				logger.error("Error obteniendo todos los perfiles", err)
				reject(err)
			} else {
				logger.debug(`Se obtuvieron ${rows?.length || 0} perfiles`)
				resolve(rows || null)
			}
		})
	})
}

export function getProfileById(id) {
	const db = getDbConnection()

	const sql = `
		SELECT *
		FROM profile
		WHERE id = ?;
	`

	return new Promise((resolve, reject) => {
		db.get(sql, [id], (err, row) => {
			if (err) {
				logger.error(`Error obteniendo perfil con ID ${id}`, err)
				reject(err)
			} else {
				logger.debug(`Perfil ${id} obtenido`)
				resolve(row || null)
			}
		})
	})
}

export function getLastProfile() {
	const db = getDbConnection()

	const sql = `
		SELECT about, bio
		FROM profile
		ORDER BY id DESC
		LIMIT 1;
	`

	return new Promise((resolve, reject) => {
		db.get(sql, [], (err, row) => {
			if (err) {
				logger.error("Error obteniendo último perfil", err)
				reject(err)
			} else {
				logger.debug("Último perfil obtenido")
				resolve(row || null)
			}
		})
	})
}
