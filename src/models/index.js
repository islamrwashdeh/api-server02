'use strict';
require('dotenv').config();
const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
let sequlizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};
let sequelize = new Sequelize(POSTGRES_URL, sequlizeOptions);
const clothes = require('./clothes');
const food = require('./food');
const clothesModel = clothes(sequelize, DataTypes);
const foodModel = food(sequelize, DataTypes);
const Collection = require('./collection-class');
const clothesCollection = new Collection(clothesModel);
const foodCollection = new Collection(foodModel);
module.exports = {
    db: sequelize,
    clothesCollection: clothesCollection,
    foodCollection: foodCollection
}