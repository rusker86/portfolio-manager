const isDev = process.env.NODE_ENV === 'development'

export const logger = {
	info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
	error: (msg, err = '') => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
	debug: (msg) => isDev && console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`)
}
