const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt를 이용해 비밀번호를 암호화. (saltRounds = 몇글자인지)

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    Image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ) {
    var user = this;

    if (user.isModified('password')) {  // 패스워드를 바꿀 때만 해당 함수 실행 (이메일 등등 해당X)
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
    
}) // 몽구스를 이용. save 전에 해당 함수를 실행. 끝난 후 next로 돌아감.

const User = mongoose.model('User', userSchema)

module.exports = { User }
