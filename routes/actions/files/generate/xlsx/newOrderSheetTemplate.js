const Excel = require("exceljs");
const fse = require("fs-extra");

// *
const newOrderSheetTemplate = async user => {
  let wb = new Excel.Workbook();

  let ws = wb.addWorksheet("Form", {
    properties: {
      tabColor: { argb: "d62d20" }
    },
    pageSetup: {
      paperSize: 9,
      orientation: "portrait",
      printArea: "A1:T52",
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
  const cellFont = (size, bold = true) => ({
    name: "Arial",
    family: 2,
    bold,
    size: size
  });

  for (let i = 0; i < 100; i++) {
    ws.getRow(i).alignment = cellAlignment;
  }

  //   HEADER
  ws.mergeCells("A1:D1");
  ws.mergeCells("A2:D6");

  const A1 = ws.getCell("A1");
  A1.value = "ZAMAWIAJĄCY";
  A1.font = cellFont(10);
  A1.border = cellBorder;

  const A2 = ws.getCell("A2");
  A2.value = `${user.company}`;
  A2.font = cellFont(24);
  A2.border = cellBorder;

  //   ITEMS
  ws.mergeCells("A10:A15");
  ws.mergeCells("B10:C15");
  ws.mergeCells("D10:D15");
  ws.mergeCells("E10:I10");
  ws.mergeCells("E11:E15");
  ws.mergeCells("F11:G14");
  ws.mergeCells("H11:I14");
  ws.mergeCells("J10:N10");
  ws.mergeCells("J11:J15");
  ws.mergeCells("K11:L14");
  ws.mergeCells("M11:N14");
  ws.mergeCells("O10:O15");
  ws.mergeCells("P10:P15");
  ws.mergeCells("Q10:Q15");
  ws.mergeCells("R10:R15");
  ws.mergeCells("S10:S15");
  ws.mergeCells("T10:T15");

  const A10 = ws.getCell("A10");
  A10.value = "Lp.";
  A10.font = cellFont(10);
  A10.border = {
    top: { style: "medium" },
    left: { style: "thin" },
    bottom: { style: "medium" },
    right: { style: "thin" }
  };
  const B10 = ws.getCell("B10");
  B10.value = "Uwagi";
  B10.font = cellFont(12);
  B10.border = {
    top: { style: "medium" },
    left: { style: "thin" },
    bottom: { style: "medium" },
    right: { style: "thin" }
  };
  const D10 = ws.getCell("D10");
  D10.value = "Rodzaj lakierowania";
  D10.font = cellFont(8);
  D10.border = {
    top: { style: "medium" },
    left: { style: "thin" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const E10 = ws.getCell("E10");
  E10.value = "Wysokość";
  E10.font = cellFont(10);
  E10.border = cellBorder;

  const J10 = ws.getCell("J10");
  J10.value = "Szerokość";
  J10.font = cellFont(10);
  J10.border = cellBorder;

  const O10 = ws.getCell("O10");
  O10.value = "Grubość";
  O10.font = cellFont(10);
  O10.border = cellBorder;

  const P10 = ws.getCell("P10");
  P10.value = "Ilość szt.";
  P10.font = cellFont(10);
  P10.border = cellBorder;
  P10.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f2f2f2" }
  };

  const Q10 = ws.getCell("Q10");
  Q10.value = "PL [m2]";
  Q10.font = cellFont(10);
  Q10.border = cellBorder;

  const R10 = ws.getCell("R10");
  R10.value = "PP [m2]";
  R10.font = cellFont(10);
  R10.border = cellBorder;

  const S10 = ws.getCell("S10");
  S10.value = "Uchwyt [mb]";
  S10.font = cellFont(9);
  S10.font.bold = false;
  S10.border = cellBorder;

  const T10 = ws.getCell("T10");
  T10.value = "Rys";
  T10.font = cellFont(10);
  T10.border = cellBorder;

  const E11 = ws.getCell("E11");
  E11.value = "wys.";
  E11.font = cellFont(10);
  E11.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f2f2f2" }
  };
  E11.border = cellBorder;

  const F11 = ws.getCell("F11");
  F11.value = "Wykończenie kraw. Uchwyt/R";
  F11.font = cellFont(8);
  F11.border = cellBorder;

  const H11 = ws.getCell("H11");
  H11.value = "Otwory pod zawiasy [szt]";
  H11.font = cellFont(8);
  H11.border = cellBorder;

  const J11 = ws.getCell("J11");
  J11.value = "szer.";
  J11.font = cellFont(10);
  J11.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "f2f2f2" }
  };
  J11.border = cellBorder;

  const K11 = ws.getCell("K11");
  K11.value = "Wykończenie kraw. Uchwyt/R";
  K11.font = cellFont(8);
  K11.border = cellBorder;

  const M11 = ws.getCell("M11");
  M11.value = "Otwory pod zawiasy [szt]";
  M11.font = cellFont(8);
  M11.border = cellBorder;

  const F15 = ws.getCell("F15");
  F15.value = "W1";
  F15.font = cellFont(8);
  F15.border = cellBorder;

  const G15 = ws.getCell("G15");
  G15.value = "W2";
  G15.font = cellFont(8);
  G15.border = cellBorder;

  const H15 = ws.getCell("H15");
  H15.value = "W1'";
  H15.font = cellFont(8, false);
  H15.border = cellBorder;

  const I15 = ws.getCell("I15");
  I15.value = "W2'";
  I15.font = cellFont(8, false);
  I15.border = cellBorder;

  const K15 = ws.getCell("K15");
  K15.value = "S1";
  K15.font = cellFont(8);
  K15.border = cellBorder;

  const L15 = ws.getCell("L15");
  L15.value = "S2";
  L15.font = cellFont(8);
  L15.border = cellBorder;

  const M15 = ws.getCell("M15");
  M15.value = "S1'";
  M15.font = cellFont(8, false);
  M15.border = cellBorder;

  const N15 = ws.getCell("N15");
  N15.value = "S2'";
  N15.font = cellFont(8, false);
  N15.border = cellBorder;

  /**
 |--------------------------------------------------
 | ITEMS
 |--------------------------------------------------
 */

  for (let i = 0; i < 151; i++) {
    ws.mergeCells(`B${i + 16}:C${i + 16}`);

    ws.getRow(i + 16).height = 16;

    const A = ws.getCell(`A${i + 16}`);
    A.value = `${i + 1}.`;
    A.font = cellFont(11);
    A.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const B = ws.getCell(`B${i + 16}`);
    B.font = cellFont(9);
    B.font.bold = false;
    B.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const D = ws.getCell(`D${i + 16}`);
    D.font = cellFont(11);
    D.font.bold = false;
    D.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const E = ws.getCell(`E${i + 16}`);
    E.font = cellFont(12);
    E.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f2f2f2" }
    };
    E.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const F = ws.getCell(`F${i + 16}`);
    F.font = cellFont(9);
    F.font.bold = false;
    F.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const G = ws.getCell(`G${i + 16}`);
    G.font = cellFont(9);
    G.font.bold = false;
    G.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const H = ws.getCell(`H${i + 16}`);
    H.font = cellFont(9);
    H.font.bold = false;
    H.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const I = ws.getCell(`I${i + 16}`);
    I.font = cellFont(9);
    I.font.bold = false;
    I.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const J = ws.getCell(`J${i + 16}`);
    J.font = cellFont(12);
    J.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f2f2f2" }
    };
    J.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const K = ws.getCell(`K${i + 16}`);
    K.font = cellFont(9);
    K.font.bold = false;
    K.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const L = ws.getCell(`L${i + 16}`);
    L.font = cellFont(9);
    L.font.bold = false;
    L.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const M = ws.getCell(`M${i + 16}`);
    M.font = cellFont(9);
    M.font.bold = false;
    M.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const N = ws.getCell(`N${i + 16}`);
    N.font = cellFont(9);
    N.font.bold = false;
    N.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const O = ws.getCell(`O${i + 16}`);
    O.font = cellFont(12);
    O.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const P = ws.getCell(`P${i + 16}`);
    P.font = cellFont(12);
    P.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };
    P.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "f2f2f2" }
    };

    const Q = ws.getCell(`Q${i + 16}`);
    Q.font = cellFont(11);
    Q.font.bold = false;
    Q.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const R = ws.getCell(`R${i + 16}`);
    R.font = cellFont(11);
    R.font.bold = false;
    R.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

    const S = ws.getCell(`S${i + 16}`);
    S.font = cellFont(11);
    S.font.bold = false;
    S.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "medium" }
    };

    const T = ws.getCell(`T${i + 16}`);
    T.font = cellFont(11);
    T.border = {
      top: { style: "thin" },
      left: { style: "medium" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  }

  for (let i = 16; i < 200; i++) {
    ws.getRow(i).height = 25;
  }
  await wb.xlsx.writeFile(
    `./files/newOrderSheet/Import_wymiarow_BLOW(wzor).xlsx`
  );

  console.log("### NEW ORDER TEMPLATE CARD GENERATED ###");

  return;
};

module.exports = newOrderSheetTemplate;
