const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require("express-validator");

const JWT_SECRET = 'Authenticate&User';

//create a user using :POST "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast five charecter").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    //if error then return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check wheather user with same email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password,salt);
      ///send to db
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET)
    


      res.json({authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
  }
);

module.exports = router;
