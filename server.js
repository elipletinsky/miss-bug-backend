import express from 'express'
import { loggerService } from './services/logger.service.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173'
    ],
    credentials: true
}

app.use(express.static('public'))
app.use(cors(corsOptions)) 
app.use(cookieParser())
app.use(express.json())

import {bugRoutes} from './api/bug/bug.routes.js'
app.use('/api/bug', bugRoutes)

//* ------------------- Bugs Crud -------------------
//* Read/List
// app.get('/api/bug', async (req, res) => {
    
//     const filterBy = {
//         txt: req.query.txt,
//         maxSeverity: +req.query.maxSeverity,
//         minCreatedAt: +req.query.minCreatedAt,
//         sortedBy: req.query.sortedBy,
//     }

//     try {
//         const bugs = await bugService.query(filterBy)
//         res.send(bugs)
//     } catch (err) {
//         loggerService.error(`Couldn't get bugs`, err)
//         res.status(400).send(`Couldn't get bugs`)
//     }
// })


// //* Add/Update
// app.get('/api/bug/save', async (req, res) => {
//     const bugToSave = {
//         _id: req.query._id,
//         title: req.query.title,
//         severity: +req.query.severity,
//         description: req.query.description,
//         createdAt: +req.query.createdAt
//     }

//     try {
//         const savedBug = await bugService.save(bugToSave)
//         res.send(savedBug)
//     } catch (err) {
//         loggerService.error(`Couldn't save bug`, err)
//         res.status(400).send(`Couldn't save bug`)
//     }
// })


// //* Read
// app.get('/api/bug/:bugId', async (req, res) => {
//     const { bugId } = req.params
//     try {
//         const bug = await bugService.getById(bugId)
//         res.send(bug)
//     } catch (err) {
//         loggerService.error(`Couldn't get bug ${bugId}`, err)
//         res.status(400).send(`Couldn't get bug`)
//     }
// })


// //* Delete
// app.get('/api/bug/:bugId/remove', async (req, res) => {
//     const { bugId } = req.params
//     try {
//         await bugService.remove(bugId)
//         res.send('OK')
//     } catch (err) {
//         loggerService.error(`Couldn't remove bug ${bugId}`, err)
//         res.status(400).send(`Couldn't remove bug`)
//     }
// })


//! EXAMPLE !
// app.get('/api/admin/logs', (req,res)=>{
//     res.sendFile(process.cwd() + '/logs/backend.log')
// })

////////////////////////////////////////////////////
//* Routes Examples
app.get('/', (req, res) => {
    res.send(`<h1>Hello And Welcome!!</h1>`)
})

// app.get('/bobo', (req, res) => {
//     res.send(`<h1>Hi Bobo</h1>`)
//     // res.send({ name: 'Hello' })
//     // res.end()
// })

// app.get('/lala', (req, res) => {
//     res.redirect(`/bobo`)
// })

// app.get('/puki', (req, res) => {
//     let visitCount = +req.cookies.visitCount || 0
//     visitCount++
//     console.log('visitCount:', visitCount)
//     res.cookie('visitCount', visitCount, { maxAge: 1000 * 5 })
//     res.send(`<h1>Hi Puki  - ${visitCount}</h1>`)
// })

app.get('/**', (req, res) => {
	res.sendFile(path.resolve('public/index.html'))
})

const port = 3030
app.listen(port, () => {
    loggerService.info(`Example app listening on port http://127.0.0.1:${port}/`)
})
