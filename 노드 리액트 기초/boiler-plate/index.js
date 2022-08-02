const express = require('express')
const app = express()
const port = 7777   
const bodyParser = require('body-parser')
const { User } = require("./models/User") // 유저 모델 가져오기

// application/x-www-form-urlencoded 분석 가능
app.use(bodyParser.urlencoded({extended: true}));
// application/json 분석 가능
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://led:led1234@boilerplate.7zof7an.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connect...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요?'))

app.post('/register', (req, res) => { // 클라이언트에서 가져온 정보를 데이터베이스에 넣는다.
    const user = new User(req.body) // 바디파서로 조각조각낸 정보

    user.save((err, userInfo) => {   // 유저 모델에 저장. +콜백함수
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))