const fse = require("fs-extra");
const orderProductionCardGenerate = require("./generate/xlsx/orderProductionCard");
const orderImageCardGenerate = require("./generate/xlsx/orderImageCard");
const { getFileExtension } = require("../../utils/files");

// *
const generateOrderProductionCards = async (order, filePath) => {
  let size = 30;
  let currentPage = 1;
  let allPages = 0;
  let itemsArrays = [];

  for (let i = 0; i < order.items.length; i += size) {
    itemsArrays.push(order.items.slice(i, i + size));
    allPages += 1;
  }

  if (order.images) {
    if (order.customMilling.path) {
      allPages += 1;
    }
    order.items.forEach(item => {
      if (item.image.path) allPages++;
    });
  }

  for (let i = 0; i < itemsArrays.length; i++) {
    const items = itemsArrays[i];
    await orderProductionCardGenerate(
      order,
      items,
      allPages,
      currentPage,
      filePath
    );
    currentPage += 1;
  }

  if (order.images) {
    const { path } = order.customMilling;
    if (path) {
      const ext = await getFileExtension(path);
      if (ext === "pdf") {
        await fse.copy(`./uploads/${path}`, `${filePath}wzorFrezowania.pdf`);
      } else {
        await orderImageCardGenerate(
          true,
          order,
          allPages,
          currentPage,
          `./uploads/${path}`,
          ext,
          "",
          filePath
        );
        currentPage += 1;
      }
    }
  }

  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i];
    if (item.image.path) {
      const ext = await getFileExtension(item.image.path);
      console.log(ext);
      if (ext === "pdf") {
        const fileName = `${order.user.company}_${order.number}_${i}[RYS].pdf`;
        await fse.copy(
          `./uploads/${item.image.path}`,
          `${filePath}${fileName}`
        );
      } else {
        await orderImageCardGenerate(
          false,
          order,
          allPages,
          currentPage,
          `./uploads/${item.image.path}`,
          ext,
          i,
          filePath
        );
        currentPage += 1;
      }
    }
  }
};

module.exports = { generateOrderProductionCards };
