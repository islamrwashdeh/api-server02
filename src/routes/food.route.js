'use strict';

const express = require('express');
const { foodCollection } = require('../models/index');
const foodRouter = express.Router();
foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getFoodByID);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

async function getFood(req, res) {
    const allFood = await foodCollection.read();
    res.status(200).json(allFood);
}

async function getFoodByID(req, res) {
    const id = parseInt(req.params.id);
    const food = await foodCollection.read(id);
    res.status(200).json(food);
}

async function createFood(req, res) {
    const obj = req.body;
    let newFood = await foodCollection.create(obj);
    res.status(201).json(newFood);
}

async function updateFood(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let updatedFood = await foodCollection.update(id, obj);
    res.status(201).json(updatedFood);
}

async function deleteFood(req, res) {
    const id = parseInt(req.params.id);
    const deletedFood = await foodCollection.delete(id);
    res.status(204).json(deletedFood);
}


module.exports = foodRouter;