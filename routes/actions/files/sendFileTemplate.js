const fse = require("fs-extra");

const contentTypes = {
  xlsx: "application/xlsx",
  png: "image/png",
  pdf: "application/pdf",
  zip: "application/zip"
};

// *
const sendFile = async (filePath, fileName, fileType, response) => {
  const stat = await fse.stat(`${filePath}${fileName}`);
  response.setHeader("Content-Length", stat.size);
  response.setHeader("Content-Type", contentTypes[fileType]);
  response.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  fse.createReadStream(`${filePath}${fileName}`).pipe(response);
};

module.exports = { sendFile };
