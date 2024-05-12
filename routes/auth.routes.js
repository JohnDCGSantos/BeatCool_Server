// Import necessary modules
const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt.middleware');

router.get('/', async (req, res) => {
    res.json('All Good')
})

router.post('/signup', async(req,res,next)=>{
    const payload=req.body
    const salt= bcrypt.genSaltSync(13)
    const passwordHash= bcrypt.hashSync(payload.password, salt)

    try {
        await User.create({email:payload.email, username:payload.userName, password:passwordHash})
        res.status(201).json({message: 'User Created'})
         

        
    } catch (error) {
        console.log(error)
        if(error.code===11000){
            res.status(403).json({errorMessage:'email alredy in use'})
        }else{
        res.status(500).json(error)
        }
    }
})
router.post('/login', async(req,res,next)=>{

    try {
      const payload=req.body
   const potentialUser= await User.findOne({email:payload.email})
   if(potentialUser){
    const doPassMatch=bcrypt.compareSync(payload.password, potentialUser.password)
if(doPassMatch){
//sign the JWT
const authToken = jwt.sign( 
    /*payload*/{userId:potentialUser._id},
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  );

   res.status(202).json({token:authToken})
}else{
//incorrect Pass
res.status(403).json({errorMessage:'wrong pass'})
}
}else{
//No user found
res.status(403).json({errorMessage:'not an user'})

} 
 } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
    }
})
//route to verify token
router.get('/verify', isAuthenticated, async (req,res)=>{

console.log('here is after middleware jwt giving us', req.payload)
const currentUser= await User.findById(req.payload.userId)
currentUser.password='FUCKYOUHACKER'
res.json({message:'Token is valid', currentUser})

})
module.exports = router
