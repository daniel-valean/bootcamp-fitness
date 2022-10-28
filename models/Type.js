const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Type extends Model {
}

Type.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        pace: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        sets: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        laps: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true,
            require: true,
        },
        workout_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            require: true,
            values: ['strength training', 'walking', 'running', 'swimming', 'hiking', 'other']

        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            require: true,
            references: 'workout',
            referencesKey: 'id',
            foreignKey: true,
        },
    },
    {

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Workout type',
    }
);

module.exports = Type;