const btnSave = document.getElementById("btnSave")
const imgPreview = document.getElementById("img")

const data = {}


// Inicializar datos existentes

// Event listener para blur en todos los data-field
btnSave.addEventListener("click", async (e) => {
	e.preventDefault()
	
	// Recopilar todos los campos
	document.querySelectorAll("[data-field]").forEach(el => {
		const field = el.dataset.field
		const value = el.innerText.trim()
	
		if(value !== "") { 
			data[field] = value 
		} else {
			delete data[field]
		}
	})

	// Guardar en la base de datos
	try {
		const response = await fetch("/api/create-profile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		})

		const result = await response.json()

		if(!response.ok) {
			alert(result.message)
			return
		}

		alert(result.message)
	} catch(err) { 
		alert("Error al guardar: " + err.message)
	}
})

document.querySelectorAll("input[type=file][data-field]").forEach(input => {
  input.addEventListener("change", async (e) => {
    const file = e.target.files[0]
    if(!file) return

    const fieldName = e.target.dataset.field
    const formData = new FormData()

		formData.append("file", file)
    formData.append("field", fieldName)
		
		imgPreview.src = URL.createObjectURL(file)
    
		try {
      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData
      })

      const result = await response.json()
      if(!response.ok) alert(result.message)
      else alert(`${fieldName} actualizado correctamente!`)
    } catch(err) {
			console.error(err)
      alert(err)
    }
  })
})

