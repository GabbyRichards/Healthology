const express = require('express')
const {
    createEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
} = require('../controllers/healthController')

const router = express.Router()

router.get('/', getEntries)

router.get('/:id', getEntry)

router.post('/', createEntry)

router.delete('/:id', deleteEntry)

router.patch('/:id', updateEntry)

module.exports = router