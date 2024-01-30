const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body ,validationResult} = require('express-validator');


//create a user using :POST "/api/auth/"
router.post('/',[
   body('email','Enter valid email').isEmail(),
   body('name','Enter valid name').isLength({min:3}),
   body('password','Password must be atleast five charecter').isLength({min:3}),
],(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
   name: req.body.name,
   email: req.body.email,
   password: req.body.password,
  }).then(user=>res.json(user))
  .catch(err=> {console.log(err)
  res.json({error: 'please enter a unique value for email',message: err.message})})

})

module.exports= router