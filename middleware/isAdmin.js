module.exports = function(req, res, next) {
  const { permission } = req.user;
  try {
    if (permission !== "admin") {
      throw "You are not admin";
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
