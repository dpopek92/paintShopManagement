const getFileExtension = async fileName => {
  const fileNameArr = fileName.split(".");
  const extension = fileNameArr[fileNameArr.length - 1];
  return extension;
};

module.exports = { getFileExtension };
