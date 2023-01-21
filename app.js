const express = require('express')
const path = require('path')
const config = require('config')
const cors = require('cors')
const app = express()

const PORT = config.get('port') || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/categories', require('./routes/categories.routes'))

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))