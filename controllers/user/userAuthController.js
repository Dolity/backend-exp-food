require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../../models");
const logger = require("../../helpers/winston");

const secret = process.env.JWT_SECRET;

module.exports = {
  login: async (req, res) => {
    logger.info("Logging in user");
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }

      const userResult = await user.findOne({
        where: {
          username: username,
        },
      });

      if (!userResult) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = bcrypt.compareSync(password, userResult.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: userResult.id, username: userResult.username },
        secret,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({ user: userResult, token: token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
      logger.error("Error logging in user: ", error);
      console.log("Error: ", error);
    }
  },
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      logger.info("Registering user");
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }

      const userResult = await user.create({
        username: username,
        password: bcrypt.hashSync(password, 10),
      });

      res.status(200).json({ message: "User created", data: userResult });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
      logger.error("Error registering user: ", error);
      console.log("Error: ", error);
    }
  },
};
