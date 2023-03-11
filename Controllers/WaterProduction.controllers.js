const express = require("express");
const db = require("../Connection/db");

module.exports = {
  createWaterProduction: (req, res, next) => {
    try {
      let waterProduction = {
        product: req.body.product,
        production_volume: req.body.production_volumne,
        opening: req.body.opening,
        caps: req.body.caps,
        bottle: req.body.bottle,
        label: req.body.label,
        wrapper: req.body.wrapper,
        boxes: req.body.boxes,
        sale: req.body.sale,
      };
      let sql = "INSERT INTO waterproductions SET ?";
      db.query(sql, waterProduction, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "error creating the order" });
        }
        res.status(200).send({
          status: true,
          message: "production created successfully",
          data: result,
        });
      });
    } catch (error) {
      next(error);
    }
  },

  getAllWaterProductionList: (req, res, next) => {
    try {
      let sql = "SELECT * FROM waterproductions";
      db.query(sql, (err, result) => {
        if (err) {
          res
            .status(400)
            .send({ status: false, message: "Error getting the producs" });
        }

        res.status(200).send({ status: true, message: "OK", data: result });
      });
    } catch (error) {
      next(error);
    }
  },
};
