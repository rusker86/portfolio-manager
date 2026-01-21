function sendError(res, message) {
	return res.status(400).json({ message })
}

export { sendError }
