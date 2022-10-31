// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');


// class Workout extends Model {

// }

// Workout.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {model: 'user', key: 'id'},
//         },
//     },
//     {

//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'workout',
//     }
// );

// module.exports = Workout;

// Define workouts model
module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('Workout', {
        workout_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        category: DataTypes.STRING,
        distance: DataTypes.STRING,
        duration: DataTypes.STRING,
        details: DataTypes.TEXT,
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return Workout;
};