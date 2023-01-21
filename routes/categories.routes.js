const express = require('express')
const router = express.Router()
const {v4} = require('uuid')

let CATEGORIES = [ 
  { id: v4(), name: 'home', marked: false },
  { id: v4(), name: 'food', marked: false },
  { id: v4(), name: 'goods', marked: false },
]

//GET
router.get('/', function(req, res) {
  res.status(200).json(CATEGORIES)
})

//POST
router.post('/', function(req, res) {
  const category = {...req.body, id: v4(), marked: false}
  CATEGORIES.push(category)
  res.status(201).json(category)
})

//DELETE
router.delete('/:id', function(req, res) {
  CATEGORIES = CATEGORIES.filter(item => item.id !== req.params.id)
  res.status(200).json({message: "Category has been removed"})
})

//PUT
router.put('/:id', function(req, res) {
  const idx = CATEGORIES.findIndex(item => item.id === req.params.id)
  CATEGORIES[idx] = req.body
  res.status(200).json(CATEGORIES[idx])
})

module.exports = router