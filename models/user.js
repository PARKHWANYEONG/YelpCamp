const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true //unique:true 로 설정하여 유효성검사에 포함되지않음
    }
})

UserSchema.plugin(passportLocalMongoose); //유저스키마에 아이디,비밀번호를 설정안하고 passport가 알아서만들어줌..해시 ,솔트 필드까지~

const User = mongoose.model('User', UserSchema);
module.exports = User;

