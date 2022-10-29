const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
//const helpers = require('./utils/helpers'); - we will decide
const routes = require('./controllers')
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// removed helpers, might need to add them back//
const hbs = exphbs.create({ });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));

sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

app.get('/', (req, res) => {
})
app.get('/login.handlebars', (req, res) => {
})
