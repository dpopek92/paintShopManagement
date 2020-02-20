const Excel = require("exceljs");
const { dateToString } = require("../../../../utils/date");
const fse = require("fs-extra");

const orderProductionCardGenerate = async (
  order,
  items,
  pages,
  page = null,
  filePath
) => {
  const qrExist = await fse.pathExists(
    `./uploads/${order.user._id}/${order.number}/qrCode.png`
  );

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

  ws.getRow(4).height = 5;
  ws.getRow(6).height = 19;
  ws.getRow(7).height = 20;
  ws.getRow(8).height = 18;
  ws.getRow(9).height = 20;
  ws.getRow(11).height = 2;
  ws.getRow(14).height = 18;
  ws.getRow(15).height = 18;

  //   HEADER
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
  if (order.paintStyle === "Prawa - połysk / Lewa - półmat") {
    ws.mergeCells("J5:K8");
  } else {
    ws.mergeCells("J5:K6");
  }
  ws.mergeCells("L5:Q6");
  ws.mergeCells("R5:T6");

  ws.mergeCells("A8:D8");
  ws.mergeCells("E8:I8");
  ws.mergeCells("L8:O8");

  const A1 = ws.getCell("A1");
  A1.value = "ZAMAWIAJĄCY";
  A1.font = cellFont(10);
  A1.border = cellBorder;

  const A2 = ws.getCell("A2");
  if (order.user.company === "Interior")
    A2.value = `${order.user.company} - ${order.user.firstname[0]}`;
  else A2.value = `${order.user.company}`;
  A2.font = cellFont(24);
  A2.border = cellBorder;

  const E1 = ws.getCell("E1");
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
  E3.value = "Strona";
  E3.font = cellFont(8);
  E3.border = {
    top: { style: "thin" },
    left: { style: "medium" },
    bottom: { style: "thin" },
    right: { style: "medium" }
  };

  const H3 = ws.getCell("H3");
  H3.value = `${page ? `${page} z ` : "1 z "}${pages}`;
  H3.font = cellFont(9);
  H3.border = cellBorder;

  const M1 = ws.getCell("M1");
  M1.value = "Data";
  M1.font = cellFont(10);
  M1.border = cellBorder;

  const P1 = ws.getCell("P1");
  P1.value = dateToString(order.date);
  P1.font = cellFont(16);
  P1.border = cellBorder;

  const M2 = ws.getCell("M2");
  M2.value = "Data realizacji";
  M2.font = cellFont(10);
  M2.border = cellBorder;

  const P2 = ws.getCell("P2");
  P2.value = dateToString(order.productionFinishDate);
  P2.font = cellFont(22);
  P2.border = cellBorder;

  const E5 = ws.getCell("E5");
  E5.value = "NUMER LAKIERU";
  E5.font = cellFont(12);
  E5.border = cellBorder;

  const J5 = ws.getCell("J5");
  if (order.paintStyle === "Prawa - połysk / Lewa - półmat") {
    J5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };
    J5.value = "Prawa - połysk / Lewa - półmat";
  } else if (order.veneerSymbol) {
    J5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };
    J5.value = "FORNIR";
  } else {
    J5.value = ``;
  }
  J5.font = cellFont(11);
  J5.border = cellBorder;

  const L5 = ws.getCell("L5");
  L5.value = `${order.color}`;
  L5.font = cellFont(18);
  L5.border = cellBorder;

  const R5 = ws.getCell("R5");
  R5.value = `${order.paintType}`;
  R5.font = cellFont(18);
  R5.border = cellBorder;

  const A8 = ws.getCell("A8");
  A8.value = `${order.name}`;
  A8.font = cellFont(11);
  A8.border = cellBorder;

  const E8 = ws.getCell("E8");
  E8.value = "NAZWA ZLECENIA";
  E8.font = cellFont(11);
  E8.border = cellBorder;

  const L8 = ws.getCell("L8");
  L8.value = "Mat. powierzony";
  L8.font = cellFont(11);
  L8.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "dotted" }
  };

  const P8 = ws.getCell("P8");
  let val = "";
  if (order.orderType === "Materiał klienta") val = "X";
  else if (order.orderType === "Reklamacja (wina BLOW)") val = "X";
  else if (order.orderType === "Poprawa (wina klienta)") val = "X";
  P8.value = val;
  P8.font = cellFont(11);
  P8.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };

  const R8 = ws.getCell("R8");
  R8.value = "CNC";
  R8.font = cellFont(11);
  R8.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "dotted" }
  };

  const S8 = ws.getCell("S8");
  S8.value = order.isFlat
    ? ""
    : `${order.millingSymbol ? order.millingSymbol : "TAK"}`;
  S8.font = cellFont(11);
  S8.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
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

  ws.mergeCells("B16:C16");
  ws.mergeCells("B17:C17");
  ws.mergeCells("B18:C18");
  ws.mergeCells("B19:C19");
  ws.mergeCells("B20:C20");
  ws.mergeCells("B21:C21");
  ws.mergeCells("B22:C22");
  ws.mergeCells("B23:C23");
  ws.mergeCells("B24:C24");
  ws.mergeCells("B25:C25");
  ws.mergeCells("B26:C26");
  ws.mergeCells("B27:C27");
  ws.mergeCells("B28:C28");
  ws.mergeCells("B29:C29");
  ws.mergeCells("B30:C30");
  ws.mergeCells("B31:C31");
  ws.mergeCells("B32:C32");
  ws.mergeCells("B33:C33");
  ws.mergeCells("B34:C34");
  ws.mergeCells("B35:C35");
  ws.mergeCells("B36:C36");
  ws.mergeCells("B37:C37");
  ws.mergeCells("B38:C38");
  ws.mergeCells("B39:C39");
  ws.mergeCells("B40:C40");
  ws.mergeCells("B41:C41");
  ws.mergeCells("B42:C42");
  ws.mergeCells("B43:C43");
  ws.mergeCells("B44:C44");
  ws.mergeCells("B45:C45");

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

  if (items.length <= 31) {
    let x;
    if (!page) x = 0;
    if (page === 1) x = 0;
    if (page === 2) x = 30;
    if (page === 3) x = 60;
    if (page === 4) x = 90;
    for (let i = 0; i < 30; i++) {
      ws.getRow(i + 16).height = 16;
      const A = ws.getCell(`A${i + 16}`);
      A.value = `${i + 1 + x}.`;
      A.font = cellFont(11);
      A.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const B = ws.getCell(`B${i + 16}`);
      let comment;
      if (items[i]) {
        comment = `${items[i].type}`;
        if (items[i].comments) {
          comment += ` - ${items[i].comments}`;
        }
        if (items[i].wLPaintedEdge) {
          comment += ` - 100mm na lewej po szerokości`;
        }
        if (items[i].hLPaintedEdge) {
          comment += ` - 100mm na lewej po wysokości`;
        }
      }
      B.value = items[i] && comment;
      B.font = cellFont(9);
      B.font.bold = false;
      B.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const D = ws.getCell(`D${i + 16}`);
      const DpaintType = () => {
        if (items[i]) {
          if (items[i].paintRight && items[i].paintLeft) {
            return "PP";
          }
          if (items[i].paintRight && !items[i].paintLeft) return "PL";
        } else return "";
      };
      D.value = DpaintType();
      D.font = cellFont(11);
      D.font.bold = false;
      D.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const E = ws.getCell(`E${i + 16}`);
      E.value = items[i] ? items[i].height : "";
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
      F.value = items[i] ? items[i].h1PEdge : "";
      F.font = cellFont(9);
      F.font.bold = false;
      F.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const G = ws.getCell(`G${i + 16}`);
      G.value = items[i] ? items[i].h2PEdge : "";
      G.font = cellFont(9);
      G.font.bold = false;
      G.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const H = ws.getCell(`H${i + 16}`);
      H.value = items[i] ? items[i].h1LEdge : "";
      H.font = cellFont(9);
      H.font.bold = false;
      H.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const I = ws.getCell(`I${i + 16}`);
      I.value = items[i] ? items[i].h2LEdge : "";
      I.font = cellFont(9);
      I.font.bold = false;
      I.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const J = ws.getCell(`J${i + 16}`);
      J.value = items[i] ? items[i].width : "";
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
      K.value = items[i] ? items[i].w1PEdge : "";
      K.font = cellFont(9);
      K.font.bold = false;
      K.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const L = ws.getCell(`L${i + 16}`);
      L.value = items[i] ? items[i].w2PEdge : "";
      L.font = cellFont(9);
      L.font.bold = false;
      L.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const M = ws.getCell(`M${i + 16}`);
      M.value = items[i] ? items[i].w1LEdge : "";
      M.font = cellFont(9);
      M.font.bold = false;
      M.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const N = ws.getCell(`N${i + 16}`);
      N.value = items[i] ? items[i].w2LEdge : "";
      N.font = cellFont(9);
      N.font.bold = false;
      N.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const O = ws.getCell(`O${i + 16}`);
      O.value = items[i] ? items[i].thickness : "";
      O.font = cellFont(12);
      O.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const P = ws.getCell(`P${i + 16}`);
      P.value = items[i] ? items[i].quantity : "";
      P.font = cellFont(12);
      P.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const Q = ws.getCell(`Q${i + 16}`);
      Q.value =
        items[i] && !items[i].surfaceLeft
          ? parseFloat(items[i].surfaceRight)
          : "";
      Q.numFmt = "0.00";
      Q.font = cellFont(11);
      Q.font.bold = false;
      Q.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const R = ws.getCell(`R${i + 16}`);
      R.value =
        items[i] && items[i].surfaceLeft
          ? parseFloat(items[i].surfaceRight + items[i].surfaceLeft)
          : "";
      R.numFmt = "0.00";
      R.font = cellFont(11);
      R.font.bold = false;
      R.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      const S = ws.getCell(`S${i + 16}`);
      S.value =
        items[i] && items[i].milledHandle
          ? parseFloat(items[i].milledHandle * 0.001)
          : "";
      S.numFmt = "0.00";
      S.font = cellFont(11);
      S.font.bold = false;
      S.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "medium" }
      };
      const T = ws.getCell(`T${i + 16}`);
      T.value = items[i] && items[i].image.path ? "X" : "";
      T.font = cellFont(11);
      T.border = {
        top: { style: "thin" },
        left: { style: "medium" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
    }
  }

  /**
|--------------------------------------------------
| FOOTER
|--------------------------------------------------
*/
  ws.mergeCells("B47:K47");
  ws.mergeCells("B48:K48");
  ws.mergeCells("B49:K49");
  ws.mergeCells("M47:O47");
  ws.mergeCells("M50:R50");
  ws.mergeCells("B51:J51");
  ws.mergeCells("B52:J52");

  ws.getRow(47).height = 20;
  ws.getRow(48).height = 20;
  ws.getRow(50).height = 20;
  ws.getRow(51).height = 20;
  ws.getRow(52).height = 90;

  const B47 = ws.getCell("B47");
  B47.alignment = { wrapText: true };
  B47.value = {
    richText: [
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "Rodzaj lakierowania P str/L str : PP"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "- Lakier dwustronny, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "PL"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " - Prawa Lakier/Lewa Laminat, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "LP"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " - Lewa półmat, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "LM"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " - Lewa Mat"
      }
    ]
  };
  B47.font = cellFont(8);
  B47.font = { bold: false, size: 7 };

  const B48 = ws.getCell("B48");
  B48.alignment = { wrapText: true };
  B48.value = {
    richText: [
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "Uchwyty frezowane: UK"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " -Uchwyt rynienkowy/krawędziowy, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "UP"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "-Pochwyt, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "U45"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "-Uchwyt 45 stopni, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "P45"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "-Pochwyt 45, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "UZ"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " - Uchwyt ZOBAL"
      }
    ]
  };
  B48.font = cellFont(8);
  B48.font = { bold: false, size: 7 };

  const B49 = ws.getCell("B49");
  B49.alignment = { wrapText: true };
  B49.value = {
    richText: [
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "Frez obwiedniowy R-Ka:  R1"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "- 1mm, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "R2"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: "- 2mm, "
      },
      {
        font: { bold: true, size: 7, name: "Arial" },
        text: "R3"
      },
      {
        font: { bold: false, size: 7, name: "Arial" },
        text: " - 3mm"
      }
    ]
  };

  const M47 = ws.getCell("M47");
  M47.value = "RAZEM";
  M47.font = cellFont(16);
  M47.border = cellBorder;
  const P47 = ws.getCell("P47");
  P47.value = order.elements;
  P47.font = cellFont(11);
  P47.border = cellBorder;
  const Q47 = ws.getCell("Q47");
  Q47.value = order.surfaceRight;
  Q47.font = cellFont(11);
  Q47.border = cellBorder;
  const R47 = ws.getCell("R47");
  R47.value = order.surfaceLeft;
  R47.font = cellFont(11);
  R47.border = cellBorder;
  const S24 = ws.getCell("S47");
  S24.value = order.milledHandle ? order.milledHandle : "";
  S24.font = cellFont(11);
  S24.border = cellBorder;

  const P48 = ws.getCell("P48");
  P48.value = "szt";
  P48.font = cellFont(11);
  P48.font.bold = false;
  P48.border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
  };
  const Q48 = ws.getCell("Q48");
  Q48.value = "PL m2";
  Q48.font = cellFont(10);
  Q48.font.bold = false;
  Q48.border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
  };
  const R48 = ws.getCell("R48");
  R48.value = "PP m2";
  R48.font = cellFont(10);
  R48.font.bold = false;
  R48.border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
  };
  const S48 = ws.getCell("S48");
  S48.value = "mb";
  S48.font = cellFont(11);
  S48.font.bold = false;
  S48.border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
  };

  const M50 = ws.getCell("M50");
  M50.value = "Ilość otworów";
  M50.font = cellFont(16);
  M50.border = cellBorder;
  const S50 = ws.getCell("S50");
  S50.value = order.hingesHoles ? order.hingesHoles : "";
  S50.font = cellFont(11);
  S50.border = cellBorder;
  const S51 = ws.getCell("S51");
  S51.value = "szt";
  S51.font = cellFont(11);
  S51.font.bold = false;
  S51.border = {
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" }
  };
  const B51 = ws.getCell("B51");
  B51.value = "UWAGI / INFORMACJE DODATKOWE";
  B51.font = cellFont(10);
  B51.border = cellBorder;
  const B52 = ws.getCell("B52");
  B52.value = order.comments;
  B52.font = cellFont(10);
  S51.font.bold = false;
  B52.border = cellBorder;

  if (qrExist) {
    const img = wb.addImage({
      filename: `./uploads/${order.user._id}/${order.number}/qrCode.png`,
      extension: "png"
    });
    ws.addImage(img, {
      tl: { col: 11.5, row: 50.5 },
      br: { col: 14.7, row: 52 }
    });
  }
  //  INFO CARD

  ws.getRow(55).height = 50;
  ws.getRow(59).height = 5;
  ws.getRow(61).height = 19;
  ws.getRow(62).height = 40;
  ws.getRow(63).height = 18;

  ws.mergeCells("A56:D56");
  ws.mergeCells("A57:D61");
  ws.mergeCells("E56:I57");
  ws.mergeCells("J56:L58");
  ws.mergeCells("M56:O56");
  ws.mergeCells("P56:T56");
  ws.mergeCells("E58:G58");
  ws.mergeCells("H58:I58");
  ws.mergeCells("M57:O58");
  ws.mergeCells("P57:T58");
  ws.mergeCells("E60:I61");
  ws.mergeCells("J60:K61");
  ws.mergeCells("L60:Q61");
  ws.mergeCells("R60:T61");

  ws.mergeCells("A63:D63");
  ws.mergeCells("E63:I63");
  ws.mergeCells("J63:K63");
  ws.mergeCells("M63:N63");

  const A56 = ws.getCell("A56");
  A56.value = "ZAMAWIAJĄCY";
  A56.font = cellFont(10);
  A56.border = cellBorder;
  const A57 = ws.getCell("A57");
  A57.value = { formula: "A2" };
  A57.font = cellFont(24);
  A57.border = cellBorder;

  const E56 = ws.getCell("E56");
  E56.value = "Nr. Zamówienia";
  E56.font = cellFont(14);
  E56.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    right: { style: "medium" }
  };

  const J56 = ws.getCell("J56");
  J56.value = { formula: "J1" };
  J56.font = cellFont(28);
  J56.border = cellBorder;

  const E58 = ws.getCell("E58");
  E58.value = "Ilość stron";
  E58.font = cellFont(8);
  E58.border = {
    top: { style: "thin" },
    left: { style: "medium" },
    bottom: { style: "thin" },
    right: { style: "medium" }
  };

  const H58 = ws.getCell("H58");
  H58.value = { formula: "H3" };
  H58.font = cellFont(9);
  H58.border = cellBorder;
  const M56 = ws.getCell("M56");
  M56.value = "Data";
  M56.font = cellFont(10);
  M56.border = cellBorder;
  const P56 = ws.getCell("P56");
  P56.value = { formula: "P1" };
  P56.font = cellFont(16);
  P56.border = cellBorder;
  const M57 = ws.getCell("M57");
  M57.value = "Data realizacji";
  M57.font = cellFont(10);
  M57.border = cellBorder;
  const P57 = ws.getCell("P57");
  P57.value = { formula: "P2" };
  P57.font = cellFont(22);
  P57.border = cellBorder;
  const E60 = ws.getCell("E60");
  E60.value = "NUMER LAKIERU";
  E60.font = cellFont(12);
  E60.border = cellBorder;
  const J60 = ws.getCell("J60");
  J60.value = { formula: "J5" };
  J60.font = cellFont(18);
  J60.border = cellBorder;
  const L60 = ws.getCell("L60");
  L60.value = { formula: "L5" };
  L60.font = cellFont(18);
  L60.border = cellBorder;
  const R60 = ws.getCell("R60");
  R60.value = { formula: "R5" };
  R60.font = cellFont(18);
  R60.border = cellBorder;
  const A63 = ws.getCell("A63");
  A63.value = { formula: "A8" };
  A63.font = cellFont(11);
  A63.border = cellBorder;
  const E63 = ws.getCell("E63");
  E63.value = "NAZWA ZLECENIA";
  E63.font = cellFont(11);
  E63.font.bold = false;
  E63.border = cellBorder;

  const J63 = ws.getCell("J63");
  J63.value = "Mat. powierzony";
  J63.font = cellFont(8);
  J63.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "dotted" }
  };
  const L63 = ws.getCell("L63");
  L63.value = { formula: "P8" };
  L63.font = cellFont(9);
  L63.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const M63 = ws.getCell("M63");
  M63.value = "CNC";
  M63.font = cellFont(12);
  M63.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "dotted" }
  };
  const O63 = ws.getCell("O63");
  O63.value = { formula: "S8" };
  O63.font = cellFont(11);
  O63.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const P63 = ws.getCell("P63");
  P63.value = "mkw";
  P63.font = cellFont(12);
  P63.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const Q63 = ws.getCell("Q63");
  Q63.value = `${
    order.surfaceLeft
      ? (order.surfaceRight + order.surfaceLeft).toFixed(2)
      : order.surfaceRight.toFixed(2)
  }`;
  Q63.font = cellFont(11);
  Q63.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  const R63 = ws.getCell("R63");
  R63.value = "szt";
  R63.font = cellFont(12);
  R63.border = {
    top: { style: "medium" },
    left: { style: "medium" },
    bottom: { style: "medium" },
    right: { style: "dotted" }
  };
  const S63 = ws.getCell("S63");
  S63.value = { formula: "P47" };
  S63.font = cellFont(14);
  S63.border = {
    top: { style: "medium" },
    left: { style: "dotted" },
    bottom: { style: "medium" },
    right: { style: "medium" }
  };
  for (let i = 16; i < 46; i++) {
    ws.getRow(i).height = 25;
  }
  await wb.xlsx.writeFile(
    `${filePath}${order.user.company}_${order.number}(${page ? page : ""}).xlsx`
  );

  console.log("### PRODUCTION CARD GENERATED ###");

  return;
};

module.exports = orderProductionCardGenerate;
