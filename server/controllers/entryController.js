const Entry = require('../models/entryModel')
const mongoose = require('mongoose')

// get all workouts
const getEntries = async (req, res) => {
  const user_id = req.user._id

  const entries = await Entry.find({user_id}).sort({createdAt: -1})

  res.status(200).json(entries)
}

// get a single workout
const getEntry = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  }

  const entry = await Entry.findById(id)

  if (!entry) {
    return res.status(404).json({error: 'No such entry'})
  }
  
  res.status(200).json(entry)
}


// create new workout
const createEntry = async (req, res) => {
  const {age, height, weight, sex} = req.body

  let emptyFields = []

  if(!age) {
    emptyFields.push('age')
  }
  if(!height) {
    emptyFields.push('height')
  }
  if(!weight) {
    emptyFields.push('weight')
  }
  if(!sex) {
    emptyFields.push('sex')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const entry = await Entry.create({age, height, weight, sex, user_id})
    res.status(200).json(entry)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteEntry = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  }

  const entry = await Entry.findOneAndDelete({_id: id})

  if (!entry) {
    return res.status(400).json({error: 'No such entry'})
  }

  res.status(200).json(entry)
}

// update a workout
const updateEntry = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such entry'})
  }

  const entry = await Entry.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!entry) {
    return res.status(400).json({error: 'No such entry'})
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