// connect to model
let {Note, User} = require('../models');


module.exports =  {
  // body...
  async indexAction (req, res, next)  {
    try {
      let notes = await Note.findAll();
      res.json(notes);
    } catch (e) {
      res.json(e);
    }
  },

  async postAction (req, res, next) {
    let { title, content} = req.body;
    //just find a random user and assign it as the note poster. [temporarily]
    let UserId = await User.findOne().then(user => user.id);
    try {
      return Note.create({title, content, UserId})
      .then(() => res.status(201).redirect('/'));
    } catch (e) {
      res.json(e);
    }
  },

   deleteAction (req, res, next) {
    let {id} = req.params;
    console.log(id);
    try {
      Note
      .findById(id)
      .then(note => note.destroy())
      // .then(() => res.status(201).redirect('/'));
      .then(affectedRows => {return Note.findAll()})
      .then(notes => res.json(notes))
    } catch (e) {
      res.json(e);
    }
  },

  patchAction (req, res, next)  {
    let {id} = req.params;
    let {title, content} = req.body;
    try {
      Note
      .findById(id)
      .then(note => note.update({title, content})).
      then((note) => res.json(note))
    } catch (e) {

    }
  }
};
