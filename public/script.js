const description = document.getElementById("about")
const bio = document.getElementById("bio")
const btnSubmit = document.getElementById("submitBtn")

btnSubmit.addEventListener("click", async e => {
	if(description.value === "" || bio.value === "") {
		alert("Rellena todos los campos")
		return
	}

	try {
		const response = await fetch("/api/create-profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				about: document.getElementById("about").value,
				bio: document.getElementById("bio").value
			})
		})

		const data = await response.json()

		if(!response.ok) {
			alert(data.message)
			return
		}

		alert(data.message)

	} catch(err) {
		alert(err)
	}

})
