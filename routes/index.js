const express = require('express')
  , router = express.Router()

router.use('/books', require('./books'))

module.exports = router
