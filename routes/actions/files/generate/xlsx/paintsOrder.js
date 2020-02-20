const Excel = require("exceljs");
const { dateToString } = require("../../../../utils/date");

// *
const generatePaintsOrder = async (order, ordersData, filePath, fileName) => {
  const { date, colors } = order;

  let wb = new Excel.Workbook();

  let ws = wb.addWorksheet("Raport", {
    properties: {
      tabColor: { argb: "d62d20" }
    },
    pageSetup: {
      paperSize: 9,
      orientation: "portrait",
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
  const cols = [
    { width: 4 },
    { width: 35 },
    { width: 10 },
    { width: 10 },
    { width: 25 },
    { width: 25 },
    { width: 20 }
  ];
  for (let i = 0; i < 50; i++) {
    cols.push({ width: 6.75 });
  }
  ws.columns = cols;

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
  const cellFont = (size = 11, bold = true) => ({
    name: "Arial",
    family: 2,
    bold: bold,
    size: size
  });

  for (let i = 0; i < 100; i++) {
    ws.getRow(i).alignment = cellAlignment;
    ws.getRow(i).height = 30;
  }

  // HEADER
  ws.mergeCells("A1:B2");
  ws.mergeCells("C1:D2");

  const A1 = ws.getCell("A1");
  A1.value = "Meble BLOW";
  A1.font = cellFont(22);
  A1.border = cellBorder;

  const C1 = ws.getCell("C1");
  C1.value = `${dateToString(date)}`;
  C1.font = cellFont(14, false);
  C1.border = cellBorder;

  // PAINTS
  const A4 = ws.getCell("A4");
  A4.value = "Lp";
  A4.font = cellFont(11);
  A4.border = cellBorder;
  const B4 = ws.getCell("B4");
  B4.value = "Dla zamówień";
  B4.font = cellFont(11);
  B4.border = cellBorder;
  const C4 = ws.getCell("C4");
  C4.value = "PL";
  C4.font = cellFont(11);
  C4.border = cellBorder;
  const D4 = ws.getCell("D4");
  D4.value = "PP";
  D4.font = cellFont(11);
  D4.border = cellBorder;
  const E4 = ws.getCell("E4");
  E4.value = "Kolor";
  E4.font = cellFont(11);
  E4.border = cellBorder;
  const F4 = ws.getCell("F4");
  F4.value = "Matowość";
  F4.font = cellFont(11);
  F4.border = cellBorder;
  const G4 = ws.getCell("G4");
  G4.value = "Ilość [kg]";
  G4.font = cellFont(11);
  G4.border = cellBorder;

  let initRow = 5;

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    const { orders } = color;
    const { length } = orders;

    ws.mergeCells(`A${initRow}:A${initRow + length - 1}`);
    ws.mergeCells(`C${initRow}:C${initRow + length - 1}`);
    ws.mergeCells(`D${initRow}:D${initRow + length - 1}`);
    ws.mergeCells(`E${initRow}:E${initRow + length - 1}`);
    ws.mergeCells(`F${initRow}:F${initRow + length - 1}`);
    ws.mergeCells(`G${initRow}:G${initRow + length - 1}`);

    const lpCell = ws.getCell(`A${initRow}`);
    lpCell.value = i + 1;
    lpCell.font = cellFont(11);
    lpCell.border = cellBorder;

    let orderRow = initRow;
    for (let j = 0; j < orders.length; j++) {
      const order = orders[j];
      const orderInfo = ordersData.find(item => {
        return item._id.toString() === order.toString();
      });

      const { number, user } = orderInfo;

      const orderName = `${user.company}-${user.firstname[0]} nr.${number}`;

      const orderCell = ws.getCell(`B${orderRow}`);
      orderCell.value = orderName;
      orderCell.font = cellFont(11, false);
      orderCell.border = cellBorder;

      orderRow += 1;
    }

    const plCell = ws.getCell(`C${initRow}`);
    plCell.value = color.surfaceRight ? color.surfaceRight.toFixed(2) : "";
    plCell.font = cellFont(11, false);
    plCell.border = cellBorder;

    const ppCell = ws.getCell(`D${initRow}`);
    ppCell.value = color.surfaceLeft ? color.surfaceLeft.toFixed(2) : "";
    ppCell.font = cellFont(11, false);
    ppCell.border = cellBorder;

    const colorCell = ws.getCell(`E${initRow}`);
    colorCell.value = color.color;
    colorCell.font = cellFont(14);
    colorCell.border = cellBorder;
    colorCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };

    const paintTypeCell = ws.getCell(`F${initRow}`);
    paintTypeCell.value = color.paintType;
    paintTypeCell.font = cellFont(14);
    paintTypeCell.border = cellBorder;
    paintTypeCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };

    const quantityCell = ws.getCell(`G${initRow}`);
    quantityCell.value = color.quantity;
    quantityCell.font = cellFont(14);
    quantityCell.border = cellBorder;
    quantityCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };

    initRow += length;
  }

  const file = await wb.xlsx.writeFile(`${filePath}${fileName}`);

  console.log("### PAINTS ORDER GENERATED ###");

  return file;
};

module.exports = generatePaintsOrder;
