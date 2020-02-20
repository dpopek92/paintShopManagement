const fse = require("fs-extra");
const qr = require("qr-image");
const { createCanvas, Image } = require("canvas");

// *
const labelGenerate = async (order, filePath, fileName) => {
  const userId = order.user._id;
  const qrCodeFileName = `${order.user.company}_${order.number}_[QR_CODE].png`;
  try {
    console.log("Start generate label");

    const exist = await fse.pathExists(
      `./uploads/${userId}/${order.number}/qrCode.png`
    );

    if (!exist) {
      console.log(`Create QR in label creator`);
      const qrCode = await qr.image(`${order._id}`, { type: "png", margin: 2 });

      await fse.ensureDir(`./uploads/${userId}/${order.number}/`);

      if (qrCode) {
        await fse.writeFile(
          `./uploads/${userId}/${order.number}/qrCode.png`,
          qrCode
        );
      }
    }

    await fse.copy(
      `./uploads/${userId}/${order.number}/qrCode.png`,
      `${filePath}${qrCodeFileName}`
    );

    const canvas = createCanvas(451, 256);
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 451, 256);
    ctx.fillStyle = "#000000";
    ctx.font = "40px Arial Black";
    ctx.fillText(`${order.user.company} - ${order.user.firstname[0]}`, 0, 32);
    ctx.font = "30px Arial";
    ctx.fillText(`zam.`, 2, 100);
    ctx.font = "65px Arial";
    ctx.fillText(`${order.number}`, 80, 100);

    ctx.font = "18px Arial";
    if (order.name) {
      if (order.name.length <= 50) {
        ctx.fillText(`(${order.name})`, 3, 120);
      } else {
        const firstPart = order.name.substring(0, 50);
        const secondPart = order.name.substring(50);
        ctx.fillText(`(${firstPart}`, 3, 120);
        ctx.fillText(`${secondPart})`, 3, 140);
      }
    }

    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${order.color}\n${order.paintType}`, 290, 170);
    ctx.font = "22px Arial";
    ctx.fillText(`Ilość elementów: ${order.elements}`, 330, 240);

    const file = await fse.readFile(`${filePath}${qrCodeFileName}`);
    if (file) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 160, img.width / 1.5, img.height / 1.5);
      };
      img.onerror = err => {
        throw err;
      };
      img.src = file;
    }

    const buff = canvas.toBuffer("image/png", {
      compressionLevel: 3,
      filters: canvas.PNG_FILTER_NONE,
      backgroundIndex: 1
    });
    await fse.writeFile(`${filePath}${fileName}`, buff);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = labelGenerate;
