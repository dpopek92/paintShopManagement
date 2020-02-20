const qr = require("qr-image");
const fse = require("fs-extra");

// *
const generateQrCodeForOrder = async (orderId, dir) => {
  const qrCode = qr.imageSync(`${orderId}`, { type: "png", margin: 2 });

  await fse.ensureDir(dir);
  await fse.writeFile(`${dir}qrCode.png`, qrCode);
  return qrCode;
};

module.exports = { generateQrCodeForOrder };
