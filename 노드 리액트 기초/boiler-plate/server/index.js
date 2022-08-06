const express = require('express')
const app = express()
const port = 7777   
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require("./models/User") // 유저 모델 가져오기
const { auth } = require("./middleware/auth")

const config = require('./config/key');

// application/x-www-form-urlencoded 분석 가능
app.use(bodyParser.urlencoded({extended: true}));
// application/json 분석 가능
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connect...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세요?'))

app.post('/api/users/register', (req, res) => { // 클라이언트에서 가져온 정보를 데이터베이스에 넣는다.
    const user = new User(req.body) // 바디파서로 조각조각낸 정보

    user.save((err, userInfo) => {   // 유저 모델에 저장. +콜백함수
        if (err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에서 있는지 찾음.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        // 있다면, 비밀번호가 맞는 비밀번호인지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            
            // 둘 다 맞다면, 유저를 위한 토큰 생성.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장한다.
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })
        })
    
    })

    
})

app.get('/api/users/auth', auth, (req, res) => {
    // 미들웨어가 있으므로, 여기까지 온거면, authentication이 true인것.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findByIdAndUpdate({ _id: req.user._id},
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
}) 

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요 !")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))