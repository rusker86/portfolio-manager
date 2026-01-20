import {
	createProfile,
	getAllProfiles,
	getProfileById,
	getLastProfile
} from "../model/modelProfile.js"
import { logger } from "../utils/logger.js"

export async function handleCreateProfile({ about, bio }) {
	if (!about || !bio) {
		const error = new Error("No hay datos para agregar")
		error.statusCode = 400
		throw error
	}

	try {
		const profile = await createProfile({ about, bio })
		logger.info("Perfil creado exitosamente")
		return profile
	} catch (error) {
		logger.error("Error en handleCreateProfile", error)
		throw error
	}
}

export async function handleGetAllProfiles() {
	try {
		const profiles = await getAllProfiles()
		logger.info("Perfiles obtenidos exitosamente")
		return profiles
	} catch (error) {
		logger.error("Error en handleGetAllProfiles", error)
		throw error
	}
}

export async function handleGetProfileById(id) {
	try {
		const profile = await getProfileById(id)
		return profile
	} catch (error) {
		logger.error("Error en handleGetProfileById", error)
		throw error
	}
}

export async function handleGetLastProfile() {
	try {
		const profile = await getLastProfile()
		return profile
	} catch (error) {
		logger.error("Error en handleGetLastProfile", error)
		throw error
	}
}
