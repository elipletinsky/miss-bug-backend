import { loggerService } from '../../services/logger.service.js'
import {  userService } from './user.service.js'

export async function getUsers(req, res) {
	const filterBy = {
		txt: req.query.txt,
		maxScore: +req.query.maxScore,
		minCreatedAt: +req.query.minCreatedAt,
		sortedBy: req.query.sortedBy,
		label: req.query.label
	}

	try {
		const users = await userService.query(filterBy)
		res.send(users)
	} catch (err) {
		loggerService.error(`Couldn't get users`, err)
		res.status(400).send(`Couldn't get users`)
	}
}

export async function getUser(req, res) {
	const { userId } = req.params
	try {
		const user = await userService.getById(userId)
		res.send(user)
	} catch (err) {
		loggerService.error(`Couldn't get user ${userId}`, err)
		res.status(400).send(`Couldn't get user`)
	}
}

export async function updateUser(req, res) {
	const userToSave = {
		_id: req.body._id,
		title: req.body.title,
		severity: +req.body.severity,
		description: req.body.description,
		createdAt: +req.body.createdAt
	}

	try {
		const savedUser = await userService.save(userToSave)
		res.send(savedUser)
	} catch (err) {
		loggerService.error(`Couldn't save user`, err)
		res.status(400).send(`Couldn't save user`)
	}
}

export async function addUser(req, res) {
	const userToSave = {
		title: req.body.title,
		severity: +req.body.severity,
		description: req.body.description,
		createdAt: +req.body.createdAt
	}

	try {
		const savedUser = await userService.save(userToSave)
		res.send(savedUser)
	} catch (err) {
		loggerService.error(`Couldn't save user`, err)
		res.status(400).send(`Couldn't save user`)
	}
}

export async function removeUser(req, res) {
	const { userId } = req.params
	try {
		await userService.remove(userId)
		res.send('OK')
	} catch (err) {
		loggerService.error(`Couldn't remove user ${userId}`, err)
		res.status(400).send(`Couldn't remove user`)
	}
}



