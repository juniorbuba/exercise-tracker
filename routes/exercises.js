const router = require('express').Router();
let Exercise = require('../model/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error encountered: ' + err));
});

router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json('Exercise Saved'))
    .catch(err => res.status(400).json('Error encountered: ' + err));
});

router.route('/delete').get((req, res) => {
    Exercise.deleteOne()
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error encountered while deleting: ' + err));
    
});

    module.export = router;