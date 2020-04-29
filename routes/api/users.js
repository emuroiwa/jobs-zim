const express = require("express");
const { response, request } = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const routes = express.Router();
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require("express-validator");

const userModel = require("../../models/User");

//@route    GET api/users
//@desc     Test
//@access   Public
routes.post(
	"/",
	[
		// name must be an string
		check("name", "Name is required").notEmpty(),
		//email
		check("email").isEmail(),
		// password must be at least 5 chars long
		check("password").isLength({ min: 5 }),
	],
	//callback fxn
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({ errors: errors.array() });
		}

		const { name, email, password } = request.body;

		try {
			//check if user exisits
			let user = await userModel.findOne({ email: email });
			if (user) {
				response.status(400).json({ errors: [{ msg: "user exists" }] });
			}
			//get avatar
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new userModel({
				name,
				email,
				avatar,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};
			response.status(200).send("Success");
		} catch (error) {
			console.error(error);
			response.status(500).send("Failed");
		}
	}
);

module.exports = routes;
