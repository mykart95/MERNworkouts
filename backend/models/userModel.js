const mongoose =require('mongoose');
const bcrypt =require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(email, password){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }

    const exits = await this.findOne({email})
    if(exits){
        throw Error('email alread in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
}

//static login method
userSchema.statics.login= async function(email, password){
    if(!email || !password){
        throw Error('Login field must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('incorrect email');
    }
    const match= await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('incorrect password');
    }
    return user
}

module.exports=mongoose.model('User', userSchema)