const express = require('express')
const app = express()
const port = 7777

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://led:led1234@boilerplate.7zof7an.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connect...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))