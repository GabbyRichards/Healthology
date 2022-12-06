const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify auth
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required.'})
  }

  //splits the user's json web token into separate fields
  const token = authorization.split(' ')[1]

  //if the token is valid, continue
  //if the token is not valid, output an error message to the console
  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized.'})
  }
}

module.exports = requireAuth