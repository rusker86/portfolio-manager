import { createDbConnection } from "../db/sqliteClient.js";

export function createProfile({about, bio}) {
	const db = createDbConnection()

	const sql = `
		INSERT INTO profile(about, bio)
		VALUES (?, ?);
	`
	
	return new Promise((resolve, rejected) => {
		db.run(sql, [about, bio], function(err) {
			if(err) { rejected(err) }
			else {
				const newProfile = {
					id: this.lastID,
					about, bio
				}

				resolve(newProfile)

				db.close()
			}
		})
	})
}

export function getAllProfiles() {
	const db = createDbConnection()

	const sql = `
		SELECT *
		FROM profile
		ORDER BY id ASC;
	`

	return new Promise((res, rej) => {
		db.all(sql, [], (err, rows) => {
			if(err) { rej(err) }
			else { res(rows || null) }

			db.close()
		})
	})
}

export function getProfileById(id) {
	const db = createDbConnection()

	const sql = `
		SELECT *
		FROM profile
		WHERE id = ?;
	`

	return new Promise((res, rej) => {
		db.get(sql, [id], (err, row) => {
			if(err) { rej(err) }
			else { res(row || null) }

			db.close()
		})
	})
}

export function getLastProfile() {
	const db = createDbConnection()

	const sql = `
		SELECT about, bio
		FROM profile
		ORDER BY id DESC
		LIMIT 1;
	`

		return new Promise((res, rej) => {
		db.get(sql, [], (err, row) => {
			if(err) { rej(err) }
			else { res(row || null) }

			db.close()
		})
	})
}
