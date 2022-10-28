//res render// 
const router = require('express').Router();
const { User } = require('../');
const withAuth = require('../');
router.get("/",(req, res)=>{
    res.render("login")
})

// Prevent non logged in users from viewing the homepage
router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('login', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
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
  
  router.get('/dashboard', (req, res) => {
    // Before rendering add-workout, we might want to perform a sequilize query
    res.render('add-workouts');
  });


module.exports = router;

