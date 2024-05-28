const logger = require("../../helpers/winston");
const { user, userprofile } = require("../../models");

module.exports = {
  profile: async (req, res) => {
    const { user_id, email, firstname, lastname, age, phone } = req.body;

    try {
      logger.info("Updating profile");
      const userResult = await user.findOne({
        where: {
          id: user_id,
        },
      });

      if (!userResult) {
        return res.status(400).json({ message: "User not found" });
      }

      const userProfile = await userprofile.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        age: age,
        phone: phone,
        user_id: user_id,
      });

      res
        .status(200)
        .json({ message: "Update profile success", userProfile: userProfile });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
      logger.error("Error updating profile: ", error);
      console.log("Error: ", error);
    }
  },
};
