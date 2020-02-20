const fse = require("fs-extra");

const removeDir = async dir => {
  fse.pathExists(dir, (err, exist) => {
    console.log(exist);
    console.log(dir);
    if (exist) {
      fse
        .remove(dir)
        .then(() => console.log("success! directory removed"))
        .catch(err => console.error(err));
    } else {
      console.log(err);
    }
  });
};

module.exports = { removeDir };
