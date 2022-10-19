const User= require('../models/userModel')
const jwt= require('jsonwebtoken')

const ceateToken=(_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


const loginUser= async (req, res)=>{
    // res.json({mssg:'Login sucessful'});
    const {email, password}= req.body
    try{
        const user= await User.login(email, password)
        const token = ceateToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const signupUser= async (req, res)=>{
    // res.json({mssg:'signup sucessful'})
    const {email, password}=req.body
    try{

        const user= await User.signup(email, password)
        const token = ceateToken(user._id)
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports={
    loginUser,
    signupUser
}