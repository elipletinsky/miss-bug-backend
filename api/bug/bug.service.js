import { makeId, readJsonFile, writeJsonFile } from "../../services/utils.js"
import { loggerService } from "../../services/logger.service.js"
export const bugService = {
    query,
    getById,
    remove,
    save
}

const bugs = readJsonFile('./data/bugs.json')

async function query(filterBy) {
    let bugsToDisplay = bugs
    try {
        loggerService.info('filterBy:', filterBy)  
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            bugsToDisplay = bugsToDisplay.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.maxSeverity) {
            bugsToDisplay = bugsToDisplay.filter(bug => bug.severity <= filterBy.maxSeverity)
        }
        
        if (filterBy.minCreatedAt) {
            bugsToDisplay = bugsToDisplay.filter(bug => bug.createdAt >= filterBy.minCreatedAt)
        }
        if (filterBy.sortedBy !== "") {
            bugsToDisplay = bugsToDisplay.sort((a, b) => {
                if (filterBy.sortedBy === 'title') return a.title.localeCompare(b.title)
                if (filterBy.sortedBy === 'severity') return a.severity - b.severity
                if (filterBy.sortedBy === 'createdAt') return a.createdAt - b.createdAt
            })
        }
        if (filterBy.label !== "") {
            bugsToDisplay = bugsToDisplay.filter(bug => Array.isArray(bug.labels) && bug.labels.includes(filterBy.label))
        }
        return bugsToDisplay
    } catch (err) {
        throw err
    }
}

async function getById(bugId) {
    try {
        const bug = bugs.find(bug => bug._id === bugId)
        if (!bug) throw new Error('Cannot find bug')
        return bug
    } catch (err) {
        throw err
    }
}

async function remove(bugId) {
    try {
        const bugIdx = bugs.findIndex(bug => bug._id === bugId)
        if (bugIdx === -1) throw new Error('Cannot find bug')
        bugs.splice(bugIdx, 1)
        await saveBugsToFile()
    } catch (err) {
        console.log('err:', err)
    }
}

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (bugIdx === -1) throw new Error('Cannot find bug')
            bugs[bugIdx] = bugToSave
        } else {
            bugToSave._id = makeId()
            bugs.unshift(bugToSave)
        }
        await saveBugsToFile()
        return bugToSave
    } catch (err) {
        throw err
    }
}


function saveBugsToFile() {
    return writeJsonFile('./data/bugs.json', bugs)
}
