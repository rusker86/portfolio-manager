import { getDB } from "../db/sqliteClient.js"
import { createLogger } from "logger"

const logger = createLogger({logFilePath: "Logs"})

export function createProfile({ about, bio }) {
	return new Promise((resolve, reject) => {
		try {
			const db = getDB()

			const sql = `
				INSERT INTO profile(about, bio)
				VALUES (?, ?);
			`

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
		} catch (error) {
			logger.error("Error en createProfile", error)
			reject(error)
		}
	})
}

export function getAllProfiles() {
	return new Promise((resolve, reject) => {
		try {
			const db = getDB()

			const sql = `
				SELECT *
				FROM profile
				ORDER BY id ASC;
			`

			db.all(sql, [], (err, rows) => {
				if (err) {
					logger.error("Error obteniendo todos los perfiles", err)
					reject(err)
				} else {
					logger.debug(`Se obtuvieron ${rows?.length || 0} perfiles`)
					resolve(rows || null)
				}
			})
		} catch (error) {
			logger.error("Error en getAllProfiles", error)
			reject(error)
		}
	})
}

export function getProfileById(id) {
	return new Promise((resolve, reject) => {
		try {
			const db = getDB()

			const sql = `
				SELECT *
				FROM profile
				WHERE id = ?;
			`

			db.get(sql, [id], (err, row) => {
				if (err) {
					logger.error(`Error obteniendo perfil con ID ${id}`, err)
					reject(err)
				} else {
					logger.debug(`Perfil ${id} obtenido`)
					resolve(row || null)
				}
			})
		} catch (error) {
			logger.error("Error en getProfileById", error)
			reject(error)
		}
	})
}

export function getLastProfile() {
	return new Promise((resolve, reject) => {
		try {
			const db = getDB()

			const sql = `
				SELECT about, bio
				FROM profile
				ORDER BY id DESC
				LIMIT 1;
			`

			db.get(sql, [], (err, row) => {
				if (err) {
					logger.error("Error obteniendo último perfil", err)
					reject(err)
				} else {
					logger.debug("Último perfil obtenido")
					resolve(row || null)
				}
			})
		} catch (error) {
			logger.error("Error en getLastProfile", error)
			reject(error)
		}
	})
}
