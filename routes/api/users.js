const express = require("express");
const { response } = require("express");
const routes = express.Router();

//@route    GET api/users
//@desc     Test
//@access   Public
routes.get("/", (request, response) => response.send("users test"));

module.exports = routes;
