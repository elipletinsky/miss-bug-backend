import { makeId, readJsonFile, writeJsonFile } from "../../services/utils.js"
import { loggerService } from "../../services/logger.service.js"
export const userService = {
    query,
    getById,
    remove,
    save
}

const users = readJsonFile('./data/users.json')

async function query(filterBy) {
    let usersToDisplay = users
    try {
        loggerService.info('filterBy:', filterBy)  
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            usersToDisplay = usersToDisplay.filter(user => regExp.test(user.fullname))
        }

        if (filterBy.maxScore) {
            usersToDisplay = usersToDisplay.filter(user => user.score <= filterBy.maxScore)
        }
        
        // if (filterBy.minCreatedAt) {
        //     usersToDisplay = usersToDisplay.filter(user => user.createdAt >= filterBy.minCreatedAt)
        // }
        // if (filterBy.sortedBy !== "") {
        //     usersToDisplay = usersToDisplay.sort((a, b) => {
        //         if (filterBy.sortedBy === 'title') return a.title.localeCompare(b.title)
        //         if (filterBy.sortedBy === 'severity') return a.severity - b.severity
        //         if (filterBy.sortedBy === 'createdAt') return a.createdAt - b.createdAt
        //     })
        // }
        // if (filterBy.label !== "") {
        //     usersToDisplay = usersToDisplay.filter(user => Array.isArray(user.labels) && user.labels.includes(filterBy.label))
        // }
        return usersToDisplay
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const user = users.find(user => user._id === userId)
        if (!user) throw new Error('Cannot find user')
        return user
    } catch (err) {
        throw err
    }
}

async function remove(userId) {
    try {
        const userIdx = users.findIndex(user => user._id === userId)
        if (userIdx === -1) throw new Error('Cannot find user')
        users.splice(userIdx, 1)
        await saveUsersToFile()
    } catch (err) {
        console.log('err:', err)
    }
}

async function save(userToSave) {
    try {
        if (userToSave._id) {
            const userIdx = users.findIndex(user => user._id === userToSave._id)
            if (userIdx === -1) throw new Error('Cannot find user')
            users[userIdx] = userToSave
        } else {
            userToSave._id = makeId()
            users.unshift(userToSave)
        }
        await saveUsersToFile()
        return userToSave
    } catch (err) {
        throw err
    }
}


function saveUsersToFile() {
    return writeJsonFile('./data/users.json', users)
}
