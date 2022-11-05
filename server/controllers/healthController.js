const Health = require('../models/healthModel')
const mongoose = require('mongoose')

//get all health entries
const getEntries = async (req, res) => {
    //newest entry at the top
    const entries = await Health.find({}).sort({createdAt: -1})

    res.status(200).json(entries)
}

//get single health entry
const getEntry = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Health.findById(id)

    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(entry)
}

//create new health entry
const createEntry = async (req, res) => {
    const {age, height, weight, sex} = req.body

    try {
        const health = await Health.create({age, height, weight, sex})
        res.status(200).json(health)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete health entry
const deleteEntry = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Health.findOneAndDelete({_id: id})

    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(entry)
}

//update health entry
const updateEntry = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Health.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!entry) {
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(entry)
}

module.exports = {
    getEntries,
    getEntry,
    createEntry,
    deleteEntry,
    updateEntry
}