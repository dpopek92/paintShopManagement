const Excel = require("exceljs");
const { dateToString } = require("../../../../utils/date");

// *
const productionListGenerate = async (orders, filePath, fileName) => {
  let wb = new Excel.Workbook();

  let ws = wb.addWorksheet("List", {
    properties: {
      tabColor: { argb: "d62d20" }
    },
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
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
    { width: 7 },
    { width: 30 },
    { width: 15 },
    { width: 35 },
    { width: 25 },
    { width: 20 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 25 },
    { width: 15 },
    { width: 25 },
    { width: 25 },
    { width: 25 }
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

  const A1 = ws.getCell("A1");
  A1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  A1.alignment = cellAlignment;
  A1.value = "Lp.";
  A1.font = cellFont(16);
  A1.border = cellBorder;
  const B1 = ws.getCell("B1");
  B1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  B1.value = "Klient";
  B1.alignment = cellAlignment;
  B1.font = cellFont(16);
  B1.border = cellBorder;
  const C1 = ws.getCell("C1");
  C1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  C1.value = "Nr";
  C1.alignment = cellAlignment;
  C1.font = cellFont(16);
  C1.border = cellBorder;
  const D1 = ws.getCell("D1");
  D1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  D1.value = "Nazwa";
  D1.alignment = cellAlignment;
  D1.font = cellFont(16);
  D1.border = cellBorder;

  const E1 = ws.getCell("E1");
  E1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  E1.value = "Kolor";
  E1.alignment = cellAlignment;
  E1.font = cellFont(16);
  E1.border = cellBorder;

  const F1 = ws.getCell("F1");
  F1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  F1.value = "Matowość";
  F1.alignment = cellAlignment;
  F1.font = cellFont(16);
  F1.border = cellBorder;

  const G1 = ws.getCell("G1");
  G1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  G1.value = "Ilość elem.";
  G1.alignment = cellAlignment;
  G1.font = cellFont(16);
  G1.border = cellBorder;

  const H1 = ws.getCell("H1");
  H1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  H1.value = "PL [m2]";
  H1.alignment = cellAlignment;
  H1.font = cellFont(16);
  H1.border = cellBorder;

  const I1 = ws.getCell("I1");
  I1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  I1.value = "PP [m2]";
  I1.alignment = cellAlignment;
  I1.font = cellFont(16);
  I1.border = cellBorder;

  const J1 = ws.getCell("J1");
  J1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  J1.value = "Data realizacji";
  J1.font = cellFont(16);
  J1.alignment = cellAlignment;
  J1.border = cellBorder;

  const K1 = ws.getCell("K1");
  K1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  K1.value = "Typ";
  K1.alignment = cellAlignment;
  K1.font = cellFont(16);
  K1.border = cellBorder;

  const L1 = ws.getCell("L1");
  L1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  L1.value = "Status";
  L1.alignment = cellAlignment;
  L1.font = cellFont(16);
  L1.border = cellBorder;

  const M1 = ws.getCell("M1");
  M1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  M1.value = "Materiał powierzony";
  M1.alignment = cellAlignment;
  M1.font = cellFont(16);
  M1.border = cellBorder;

  const N1 = ws.getCell("N1");
  N1.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "c7c7c7" }
  };
  N1.value = "Rodzaj lakierowania";
  N1.alignment = cellAlignment;
  N1.font = cellFont(16);
  N1.border = cellBorder;

  /**
 |--------------------------------------------------
 | ITEMS
 |--------------------------------------------------
 */

  for (let i = 0; i < orders.length; i++) {
    ws.getRow(i + 2).height = 40;

    const A = ws.getCell(`A${i + 2}`);

    A.value = `${i + 1}.`;
    A.alignment = cellAlignment;
    A.font = cellFont(16);
    A.font.bold = false;
    A.border = cellBorder;

    const B = ws.getCell(`B${i + 2}`);

    B.value = orders[i].user.company;
    B.alignment = cellAlignment;
    B.font = cellFont(16);
    B.border = cellBorder;

    const C = ws.getCell(`C${i + 2}`);

    C.value = orders[i].number;
    C.alignment = cellAlignment;
    C.font = cellFont(16);
    C.border = cellBorder;

    const D = ws.getCell(`D${i + 2}`);

    D.value = orders[i].name;
    D.alignment = cellAlignment;
    D.font = cellFont(16);
    D.font.bold = false;
    D.border = cellBorder;

    const E = ws.getCell(`E${i + 2}`);

    E.value = orders[i].color;
    E.alignment = cellAlignment;
    E.font = cellFont(16);
    E.font.bold = false;
    E.border = cellBorder;

    const F = ws.getCell(`F${i + 2}`);

    F.value = orders[i].paintType;
    F.alignment = cellAlignment;
    F.font = cellFont(16);
    F.font.bold = orders[i].paintType === "Połysk" ? true : false;
    F.border = cellBorder;

    const G = ws.getCell(`G${i + 2}`);

    G.value = orders[i].elements;
    G.alignment = cellAlignment;
    G.font = cellFont(16);
    G.font.bold = false;
    G.border = cellBorder;

    const H = ws.getCell(`H${i + 2}`);

    H.value = orders[i].surfaceRight ? orders[i].surfaceRight.toFixed(2) : "";
    H.font = cellFont(16);
    H.alignment = cellAlignment;
    H.font.bold = false;
    H.border = cellBorder;

    const I = ws.getCell(`I${i + 2}`);

    I.value = orders[i].surfaceLeft ? orders[i].surfaceLeft.toFixed(2) : "";
    I.font = cellFont(16);
    I.alignment = cellAlignment;
    I.font.bold = false;
    I.border = cellBorder;

    const J = ws.getCell(`J${i + 2}`);

    J.value = dateToString(orders[i].productionFinishDate);
    J.font = cellFont(16);
    J.alignment = cellAlignment;
    J.border = cellBorder;
    cellBorder;

    const K = ws.getCell(`K${i + 2}`);
    K.value = orders[i].veneerSymbol
      ? "Fornir"
      : `${!orders[i].isFlat ? "CNC" : ""}`;
    K.font = cellFont(16);
    K.alignment = cellAlignment;
    K.border = cellBorder;

    const L = ws.getCell(`L${i + 2}`);
    L.value = orders[i].productionStatus;
    L.font = cellFont(16);
    L.alignment = cellAlignment;
    L.border = cellBorder;

    const M = ws.getCell(`M${i + 2}`);
    M.value = orders[i].orderType === "Materiał klienta" ? "Tak" : "";
    M.font = cellFont(16);
    M.alignment = cellAlignment;
    M.border = cellBorder;

    const N = ws.getCell(`N${i + 2}`);
    N.value = orders[i].paintStyle;
    N.font = cellFont(14);
    N.alignment = cellAlignment;
    N.border = cellBorder;
  }

  await wb.xlsx
    .writeFile(`${filePath}${fileName}`)
    .then(() => console.log("XLSX_prod generated"))
    .catch(err => console.log(err));
};

module.exports = productionListGenerate;
