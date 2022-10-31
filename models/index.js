const User = require('./user');
const Workout = require('./workout');
// const Type = require('./Type');
User.hasMany(Workout, {
  foreignKey: 'user_id', onDelete: 'CASCADE'
})
//Removed Type below in curly brackets
Workout.belongsTo(User, {
  foreignKey: 'user_id', onDelete: 'CASCADE'
})

module.exports = { User, Workout };
// Export the models object