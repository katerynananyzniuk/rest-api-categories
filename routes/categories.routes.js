const express = require('express')
const router = express.Router()
const {v4} = require('uuid')

const CATEGORIES = [ 
  { id: 1, name: 'home', marked: false },
  { id: 2, name: 'food', marked: false },
  { id: 3, name: 'goods', marked: false },
]

router.get('/', function(req, res) {
  res.status(200).json(CATEGORIES)
})

router.post('/', function(req, res) {
  const category = {...req.body, id: v4(), marked: false}
  CATEGORIES.push(category)
  res.status(201).json(category)
})

module.exports = router