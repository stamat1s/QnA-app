
const User = require("../models/User");

module.exports = {
  //getUserData
  getUserData:  async (req, res) => {
    const user = await User.findById(req.user); //req.user = jwt.verify.user (id) (auth middleware)
    // here you are taking the record and restoring it in a user const as a associative array
    // yeah but this is backend, i mean user from frontend
    // these all data you are passing from here you are storing it in userData in create context
    

    // if not return 401
    if (!user)
      return res.status(401).json({ success: 0, message: "Unknown user" });

    return res.status(200).json({
      success: 1,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        description: user.description,
        color: user.color,
        numberOfQuestions: user.numberOfQuestions,
        numberOfAnswers: user.numberOfAnswers,
        numberOfLikes: user.numberOfLikes,
      },
    });
  }

}






