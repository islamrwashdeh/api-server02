'use strict';
const express = require('express');
const { clothesCollection } = require('../models/index');
const clothesRouter = express.Router();
clothesRouter.get('/clothes', getClothes);
clothesRouter.get('/clothes/:id', getClothingByID);
clothesRouter.post('/clothes', createClothes);
clothesRouter.put('/clothes/:id', updateClothes);
clothesRouter.delete('/clothes/:id', deleteClothes);

async function getClothes(req, res) {
    const allClothes = await clothesCollection.read();
    res.status(200).json(allClothes);
}

async function getClothingByID(req, res) {
    const id = parseInt(req.params.id);
    const clothing = await clothesCollection.read(id);
    res.status(200).json(clothing);
}

async function createClothes(req, res) {
    const obj = req.body;
    let newClothing = await clothesCollection.create(obj);
    res.status(201).json(newClothing);
}

async function updateClothes(req, res) {
    const id = parseInt(req.params.id);
    const obj = req.body;
    let updatedClothing = await clothesCollection.update(id, obj);
    res.status(201).json(updatedClothing);
}

async function deleteClothes(req, res) {
    const id = parseInt(req.params.id);
    const deletedClothing = await clothesCollection.delete(id);
    res.status(204).json(deletedClothing);
}

module.exports = clothesRouter;