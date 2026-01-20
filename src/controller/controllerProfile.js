import {
	createProfile,
	getAllProfiles,
	getProfileById,
	getLastProfile
}

from "../model/modelProfile.js"

export async function handleCreateProfile({about, bio}) {
	if(!about || !bio) {
		const error = new Error("No hay datos para agregar")

		error.statusCode = 400
		throw error
	} else {
		await createProfile({ about, bio })
	}
}

export async function handleGetAllProfiles() {
	const profiles= await getAllProfiles()

	return profiles
}

export async function handleGetProfileById(id) {
	const profile = await getProfileById(id)

	return profile
}

export async function handleGetLastProfile() {
	const profile = await getLastProfile()

	return profile
}
