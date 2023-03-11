const express = require("express");
const routes = express.Router();
const waterProduction = require("../Controllers/WaterProduction.controllers");

routes.post("/createWaterProduction", waterProduction.createWaterProduction);
routes.get("/getAllWaterProducts", waterProduction.getAllWaterProductionList);

module.exports = routes;
