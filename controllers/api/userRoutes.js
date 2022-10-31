const router = require('express').Router();
const {User} = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted e-mail address
        const userData = await User.findOne({where: {email: req.body.email}});

        if (!userData) {
            res
                .status(400)
                .json({message: 'Incorrect email or password, please try again 111'});
            return;
        }

        // Verify the posted password with the password store in the database
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect email or password, please try again 222'});
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({user: userData, message: 'You are now logged in!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res
                .status(204)
                .json({message: 'You are now logged out!'})
                .end();
        });
    } else {
        res.status(400).end();
    }
});

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.logged_in = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/workouts', (req, res) => {
  res.render('workout-completed');
  });

module.exports = router;