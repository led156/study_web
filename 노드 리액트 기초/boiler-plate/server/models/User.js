const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt를 이용해 비밀번호를 암호화. (saltRounds = 몇글자인지)
const jwt = require('jsonwebtoken');

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
        });
    } else {
        next()
    }
    
}) // 몽구스를 이용. save 전에 해당 함수를 실행. 끝난 후 next로 돌아감.

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken 이용하여 토큰 생성.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token ... 'secretToken' -> user._id . => 따라서 이때 만든 토큰도 기억해줘야 함.
    user.token = token
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // 토큰 디코드
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 복호화하여 나온 유저 아이디를 찾는다.
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
