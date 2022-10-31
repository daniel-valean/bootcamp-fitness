const router = require('express').Router();
const {Workout, Type} = require('../../models');

router.post('/', (req, res) => {
    console.log(req.body)
    Workout.create(
        {...req.body,user_id:req.session.userId}
    )
        .then(dbWorkoutData => {

            res.json(dbWorkoutData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;