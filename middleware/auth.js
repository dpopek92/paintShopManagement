const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(400).json({ msg: "No token, auth denied:(" });
  }
  // vetify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
