//res render// 
const router = require('express').Router();
const {User} = require('../models');
const withAuth = require('../utils/auth');

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

// router.get('/dashboard', (req, res) => {
    // Before rendering add-workout/home, we might want to perform a sequilize query
//     res.render('addworkout');
// });

//get workouts from logged in user
// router.get('/workout', (req, res) => {
//     res.render('/addworkout');
// })

router.get('/view_workouts', (req, res) => {
    res.render('view_workouts');
})

module.exports = router;

