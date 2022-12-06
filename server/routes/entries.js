const express = require('express')
const {
    createEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
} = require('../controllers/entryController')
const requireAuth = require('../middleware/requireAuth')

//require auth for all entries routes
const router = express.Router()

router.use(requireAuth)

//routes for all entry functions
//those with '/' get all user entries from the MongoDB database
//those with '/:id' get a specific entry based on id

router.get('/', getEntries)

router.get('/:id', getEntry)

router.post('/', createEntry)

router.delete('/:id', deleteEntry)

router.patch('/:id', updateEntry)

module.exports = router