import express from "express"
import path from "path"
import {
	handleCreateProfile,
	handleGetAllProfiles,
	handleGetLastProfile,
	handleGetProfileById
} from "../controller/controllerProfile.js"
import { initializeDataBase, createDbConnection } from "../db/sqliteClient.js"


const app = express()

const db = createDbConnection()
initializeDataBase(db)

app.set("view engine", "ejs")
app.set("views", path.join(process.cwd(), "view"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(process.cwd(), "public")))

app.get("/", async (req, res) => {
	try {
		const lastProfile = await handleGetLastProfile()

		res.render("portfolio/index", {
			about: lastProfile?.about || "",
			bio: lastProfile?.bio || ""
		})
	} catch (error) {
		console.error(error)
		res.status(500).send("Error cargando el perfil")
	}
})


app.get("/admin-panel", (req, res) => {
	res.render("admin")
})

app.post("/api/create-profile", async (req, res) => {
	const { about, bio } = req.body

	if (!about || !bio) {
		return res.status(400).json({
			message: "La descripción y la bio son obligatorias"
		})
	}

	try {
		await handleCreateProfile({ about, bio })
		res.status(201).json({ message: "Perfil creado correctamente" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error al guardar el perfil" })
	}
})


app.listen(3000, () => {
	console.log("Servidor escuchando en localhost:3000")
})
