/**
 * Created on 29/1/2024 @author Mukund Raj
 * @version v1.0
 */
"use strict";
var express = require("express");
var router = express.Router();
// const balanceController = require("../../controllers/books.controller");

const path = require("path");
const endPoint = `/${path.basename(__dirname)}/books`;


//further to add middlewares and manymore routes.
router.get(`${endPoint}`, () => {});
router.put(`${endPoint}/:id`, () => {});
router.post(endPoint, () => {});

module.exports = router;
