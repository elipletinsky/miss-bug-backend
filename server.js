import express from 'express'
import { loggerService } from './services/logger.service.js'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express()

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('public'))

} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))

}


// const corsOptions = {
//     origin: [
//         'http://127.0.0.1:5173',
//         'http://localhost:5173'
//     ],
//     credentials: true
// }

app.use(express.static('public'))
// app.use(cors(corsOptions)) 
app.use(cookieParser())
app.use(express.json())

import {bugRoutes} from './api/bug/bug.routes.js'
app.use('/api/bug', bugRoutes)
import {userRoutes} from './api/user/user.routes.js'
app.use('/api/user', userRoutes)
import { authRoutes } from './api/auth/auth.routes.js'
app.use('/api/auth', authRoutes)

//* Routes Examples
app.get('/', (req, res) => {
    res.send(`<h1>Hello And Welcome!!</h1>`)
})


// fallback route
app.get('/**', (req, res) => {
	res.sendFile(path.resolve('public/index.html'))
})

const port = 3030
const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    loggerService.info('Up and running on port ' + PORT)
})
