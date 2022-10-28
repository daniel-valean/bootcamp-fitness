const { Model, DataTypes } = require('sequelize');
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
        },
        pace: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        sets: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        laps: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true,

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
        modelName: 'Type',
    }
);

module.exports = Type;