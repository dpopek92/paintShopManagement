const Excel = require("exceljs");
const { dateToString } = require("../../../../utils/date");
const fse = require("fs-extra");

// *
const orderImageCardGenerate = async (
  customMilling,
  order,
  pages,
  page,
  imgPath,
  ext,
  item,
  filePath
) => {
  const qrExist = await fse.pathExists(
    `./uploads/${order.user._id}/${order.number}/qrCode.png`
  );

  let wb = new Excel.Workbook();

  let ws = wb.addWorksheet("Form", {
    properties: {
      tabColor: { argb: "d62d20" },
      defaultRowHeight: 20
    },
    pageSetup: {
      paperSize: 9,
      orientation: "portrait",
      printArea: "A1:T56",
      fitToPage: true,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.25,
        bottom: 0.25,
        header: 0,
        footer: 0
      }
    }
  });

  ws.columns = [
    { width: 4 },
    { width: 15 },
    { width: 15 },
    { width: 7.5 },
    { width: 7.5 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 7.5 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 5.2 },
    { width: 5.5 },
    { width: 7.5 },
    { width: 7 },
    { width: 7 },
    { width: 7 },
    { width: 5.5 }
  ];
  const cellBorder = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const cellAlignment = {
    wrapText: true,
    vertical: "middle",
    horizontal: "center"
  };
  const cellFont = size => ({
    name: "Arial",
    family: 2,
    bold: true,
    size: size
  });
  ws.getRow(4).height = 5;
  ws.getRow(6).height = 19;
  ws.getRow(7).height = 40;

  ws.mergeCells("A1:D1");
  ws.mergeCells("A2:D6");
  ws.mergeCells("E1:I2");
  ws.mergeCells("J1:L3");
  ws.mergeCells("M1:O1");
  ws.mergeCells("P1:T1");
  ws.mergeCells("E3:G3");
  ws.mergeCells("H3:I3");
  ws.mergeCells("M2:O3");
  ws.mergeCells("P2:T3");
  ws.mergeCells("E5:I6");
  ws.mergeCells("J5:K6");
  ws.mergeCells("L5:Q6");
  ws.mergeCells("R5:T6");

  const A1 = ws.getCell("A1");
  A1.alignment = cellAlignment;
  A1.value = "ZAMAWIAJĄCY";
  A1.font = cellFont(10);
  A1.border = cellBorder;

  const A2 = ws.getCell("A2");
  A2.alignment = cellAlignment;
  A2.value = `${order.user.company}`;
  A2.font = cellFont(24);
  A2.border = cellBorder;

  const E1 = ws.getCell("E1");
  E1.alignment = cellAlignment;
  E1.value = "Nr. Zamówienia";
  E1.font = cellFont(14);
  E1.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    right: { style: "medium" }
  };
  const J1 = ws.getCell("J1");
  J1.alignment = cellAlignment;
  J1.value = `${order.number}`;
  J1.font = cellFont(28);
  J1.border = cellBorder;

  const E3 = ws.getCell("E3");
  E3.alignment = cellAlignment;
  E3.value = "Ilość stron";
  E3.font = cellFont(8);
  E3.border = {
    top: { style: "thin" },
    left: { style: "medium" },
    bottom: { style: "thin" },
    right: { style: "medium" }
  };
  const H3 = ws.getCell("H3");
  H3.alignment = cellAlignment;
  H3.value = `${page ? `${page} z ` : "1 z "}${pages}`;
  H3.font = cellFont(9);
  H3.border = cellBorder;

  const M1 = ws.getCell("M1");
  M1.alignment = cellAlignment;
  M1.value = "Data";
  M1.font = cellFont(10);
  M1.border = cellBorder;

  const P1 = ws.getCell("P1");
  P1.alignment = cellAlignment;
  P1.value = dateToString(order.date);
  P1.font = cellFont(16);
  P1.border = cellBorder;

  const M2 = ws.getCell("M2");
  M2.alignment = cellAlignment;
  M2.value = "Data realizacji";
  M2.font = cellFont(10);
  M2.border = cellBorder;

  const P2 = ws.getCell("P2");
  P2.alignment = cellAlignment;
  P2.value = dateToString(order.productionFinishDate);
  P2.font = cellFont(22);
  P2.border = cellBorder;

  const E5 = ws.getCell("E5");
  E5.alignment = cellAlignment;
  E5.value = "NUMER LAKIERU";
  E5.font = cellFont(12);
  E5.border = cellBorder;

  const J5 = ws.getCell("J5");
  J5.alignment = cellAlignment;
  J5.value = ``;
  J5.font = cellFont(18);
  J5.border = cellBorder;

  const L5 = ws.getCell("L5");
  L5.alignment = cellAlignment;
  L5.value = `${order.color}`;
  L5.font = cellFont(18);
  L5.border = cellBorder;

  const R5 = ws.getCell("R5");
  R5.alignment = cellAlignment;
  R5.value = `${order.paintType}`;
  R5.font = cellFont(18);
  R5.border = cellBorder;

  const img = wb.addImage({
    filename: imgPath,
    extension: ext
  });
  ws.addImage(img, {
    tl: { col: 1, row: 7 },
    br: { col: 19, row: 49 },
    editAs: "oneCell"
  });

  if (qrExist) {
    const img = wb.addImage({
      filename: `./uploads/${order.user._id}/${order.number}/qrCode.png`,
      extension: "png"
    });
    ws.addImage(img, {
      tl: { col: 16, row: 50 },
      br: { col: 18.2, row: 55 }
    });
  }

  await wb.xlsx.writeFile(
    !customMilling
      ? `${filePath}${order.user.company}_${order.number}_${item}[RYS].xlsx`
      : `${filePath}wzorFrezowania_${order.user.company}_${order.number}[RYS].xlsx`
  );

  console.log("### IMAGE CARD GENERATED ###");
  return;
};

module.exports = orderImageCardGenerate;
