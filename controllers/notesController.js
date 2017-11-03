// connect to model
let {Note} = require('../models')

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

  postAction (req, res, next) {
    let { title, content} = req.body;
    try {
      return Note.create({title, content, UserId: 4})
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
      .then(() => res.redirect('/'));
    } catch (e) {
      res.json(e);
    }
  }
};
