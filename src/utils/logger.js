import chalk from "chalk"

const isDev = process.env.NODE_ENV === 'development'

export const logger = {
	info: (msg) => console.log(chalk.blue(`[INFO] ${new Date().toISOString()} - ${msg}`)),
	warn: (msg, err = '') => console.log(chalk.yellow(`[WARN] ${new Date().toISOString()} - ${msg}`)),
	error: (msg, err = '') => console.error(chalk.red(`[ERROR] ${new Date().toISOString()} - ${msg}`, err)),
	debug: (msg) => isDev && console.log(chalk.green(`[DEBUG] ${new Date().toISOString()} - ${msg}`))
}
