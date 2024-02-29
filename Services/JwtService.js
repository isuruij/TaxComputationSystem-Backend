const jwt = require("jsonwebtoken");
module.exports.createToken = async (obj) => {
  try {
    const token = jwt.sign(obj, "key");

    // res.cookie("token", token);
    // res.json({ Status: "Success", Data: taxpayer });
    return { status: true, token: token };
  } catch (error) {
    return { status: false };
  }
};

module.exports.verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "key");
    req.name = decoded.name;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
}; 
