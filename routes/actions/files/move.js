const fse = require("fs-extra");

// *
const moveNewOrderItemsImages = async (files = [], from, to) => {
  files.forEach(file =>
    fse
      .move(`${from}${file.filename}`, `${to}${file.filename}`, {
        overwrite: true
      })
      .then(() => console.log("success! images moved"))
      .catch(err => console.error(err))
  );
};

// *
const copyCustomMillingImage = async (path, to, number, orderOwnerId) => {
  const customMillingPathArr = path.split("/");
  const fileName = customMillingPathArr[customMillingPathArr.length - 1];
  const numberArr = number.split(".");
  const orderNumber = numberArr[0];

  fse.pathExists(`${to}${fileName}`, (err, exist) => {
    if (!exist) {
      fse
        .copy(
          `./uploads/${orderOwnerId}/${orderNumber}/${fileName}`,
          `${to}${fileName}`,
          { overwrite: true }
        )
        .then(() => console.log("success! Image copied"))
        .catch(err => console.error(err));
    } else {
      console.log(err);
    }
  });
};

module.exports = { moveNewOrderItemsImages, copyCustomMillingImage };
