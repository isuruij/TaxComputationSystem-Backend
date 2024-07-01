const jwt = require("jsonwebtoken");
module.exports.createToken = async (obj) => {
  try {
    const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: "1d" });
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
      console.log(req.cookies)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("+++++++++++++++++")
      console.log(roles)

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      console.log("+++++new+++++")
      next();
    } catch (e) {
      console.log(e.message)
      res.status(401).send({ error: "please authenticate" });
    }
  };
};

module.exports.verifytaxpayer = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.name = decoded.name;
    next();
  } catch (e) {
    res.send({ Status: "Failed" });
  }
};

module.exports.authtaxpayer = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.name = decoded.name;
    if (decoded.role === "taxpayer") {
      next();
    } else {
      res.send({ Status: "Failed" });
    }
  } catch (e) {
    res.send({ Status: "Failed" });
  }
};

module.exports.authtsuperAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.name = decoded.name;
    if (decoded.role === "superAdmin") {
      next();
    } else {
      res.send({ Status: "Failed" });
    }
  } catch (e) {
    console.log(e.message)
    res.send({ Status: "Failed" });
  }
};


module.exports.authtsecondAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.name = decoded.name;
    if (decoded.role === "secondAdmin") {
      next();
    } else {
      res.send({ Status: "Failed" });
    }
  } catch (e) {
    console.log(e.message)
    res.send({ Status: "Failed" });
  }
};