const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error encountered: ' + err));
});

  router.route('/:id').get((req,res) => {
     Exercise.findById(req.params.id)
     .then(exercise => res.json(exercise))
     .catch(err => res.status(400).json("Error encountered: " + err));
  });

  router.route('/delete/:id').delete((req,res) => {
      Exercise.findByIdAndDelete(req.params.id)
      .then(exercise => res.json("Exercise deleted successfully"))
      .catch(err => res.status(400).json("Error encountered: " + err));
  });

  router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username,
      exercise.description = req.body.description,
      exercise.duration = Number(req.body.duration),
      exercise.date = Date.parse(req.body.duration);

      exercise.save()
      .then(exercise => res.json("Exercise successfully updated"))
      .catch(err => res.status(400).json("Error encountered: " + err));
    })
    .catch(err =>res.status(400).json("Error encountered: " + err));
  });


module.exports = router;