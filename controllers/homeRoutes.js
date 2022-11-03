//res render// 
const router = require('express').Router();
const {User, Workout} = require('../models');
const {create} = require('../models/User');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');

// Prevent non logged in users from viewing the homepage

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['password']},
        });

        const users = userData.map((project) => project.get({plain: true}));

        res.render('addworkout', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the add workout page
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/view_workouts', async (req, res) => {
    const workoutData = await Workout.findAll({
        where: {
            user_id: req.session.userId
        },
        attributes: [
            [Sequelize.fn('MAX', Sequelize.col('workout_date')), 'workout_date'],
            [Sequelize.fn('SUM', Sequelize.col('distance')), 'distance'],
            [Sequelize.fn('SUM', Sequelize.col('duration')), 'duration']
        ],
        group: ['user_id']
    })

    const workout = await workoutData.map(workout => workout.get({plain: true}));


    console.log(workout)
    res.render('view_workouts', {
        //user,
        ...workout[0],
        logged_in: req.session.logged_in,
    });
})

router.get('/addworkout', (req, res) => {
    res.render('addworkout');
});

module.exports = router;

