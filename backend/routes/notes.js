const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1 : get all the  notes using: GET '/api/auth/getuser.Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 2 : add a  note using: POST '/api/auth/addnote.Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast five charecter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //if error then return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
