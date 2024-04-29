const jwt = require("jsonwebtoken");
module.exports.createToken = async (obj) => {
  try {
    const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { status: true, token: token, type: obj.role };
  } catch (error) {
    return { status: false };
  }
};

module.exports.verifyuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.name = decoded.name;
    next();
  } catch (e) {
    res.send({ Status: "Failed" });
  }
};

module.exports.roleBasedAuth = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (e) {
      res.status(401).send({ error: "please authenticate" });
    }
  };
};
