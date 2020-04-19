const fse = require("fs-extra");

const getFileExtension = async fileName => {
  const fileNameArr = fileName.split(".");
  const extension = fileNameArr[fileNameArr.length - 1];
  return extension;
};

const moveFiles = async (files = [], from, to) => {
  if (files.length)
    files.forEach(file => {
      fse
        .move(`${from}${file.filename}`, `${to}${file.filename}`, {
          overwrite: true
        })
        .then(() => console.log("file moved"))
        .catch(err => console.log(err));
    });
};

module.exports = { getFileExtension, moveFiles };
