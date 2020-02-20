const Excel = require("exceljs");
const {
  months,
  columnsForEmployeesReport
} = require("../../../../utils/const");

const employeesReportGenerate = async (
  year,
  month,
  position,
  employees,
  statistics,
  filePath,
  fileName
) => {
  let wb = new Excel.Workbook();

  let ws = wb.addWorksheet("Raport", {
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
  const cols = [];
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

  // HEADER
  ws.mergeCells("A1:L3");
  ws.mergeCells("M1:O2");
  ws.mergeCells("M3:O3");

  const A1 = ws.getCell("A1");
  A1.value = position.toUpperCase();
  A1.font = cellFont(36);
  A1.border = cellBorder;
  A1.alignment = cellAlignment;

  const M1 = ws.getCell("M1");
  M1.value = year;
  M1.font = cellFont(24);
  M1.border = cellBorder;
  M1.alignment = cellAlignment;

  const M3 = ws.getCell("M3");
  M3.value = months[month - 1].toUpperCase();
  M3.font = cellFont(11);
  M3.border = cellBorder;
  M3.alignment = cellAlignment;

  // EMPLOYEES DATA

  let Row = 5;
  for (let i = 0; i < statistics.length; i++) {
    const stats = statistics[i];
    let employeeName, employeeWorkedHours, earnings;
    employees.forEach(employee => {
      if (employee._id.toString() === stats.employee.toString()) {
        employeeName = `${employee.firstname} ${employee.surname}`;
        employeeWorkedHours = stats.workedHours;
        earnings = parseFloat(employee.earnings) || 0;
      }
    });

    // employee data
    ws.mergeCells(`A${Row}:E${Row + 1}`);
    ws.mergeCells(`G${Row}:H${Row + 1}`);
    ws.mergeCells(`I${Row}:I${Row + 1}`);
    ws.mergeCells(`K${Row}:L${Row + 1}`);
    ws.mergeCells(`M${Row}:N${Row + 1}`);

    // stats
    ws.mergeCells(`A${Row + 2}:D${Row + 2}`);
    ws.mergeCells(`A${Row + 3}:B${Row + 4}`);
    ws.mergeCells(`A${Row + 5}:B${Row + 6}`);
    ws.mergeCells(`C${Row + 3}:D${Row + 3}`);
    ws.mergeCells(`C${Row + 4}:D${Row + 4}`);
    ws.mergeCells(`C${Row + 5}:D${Row + 5}`);
    ws.mergeCells(`C${Row + 6}:D${Row + 6}`);
    ws.mergeCells(`A${Row + 8}:D${Row + 8}`);
    ws.mergeCells(`A${Row + 7}:AI${Row + 7}`);
    // stats - summary
    ws.mergeCells(`AJ${Row + 2}:AP${Row + 2}`);
    ws.mergeCells(`AK${Row + 3}:AL${Row + 4}`);
    ws.mergeCells(`AK${Row + 5}:AL${Row + 6}`);
    ws.mergeCells(`AM${Row + 3}:AM${Row + 4}`);
    ws.mergeCells(`AM${Row + 5}:AM${Row + 6}`);
    ws.mergeCells(`AN${Row + 3}:AP${Row + 6}`);
    ws.mergeCells(`AJ${Row + 7}:AM${Row + 8}`);
    ws.mergeCells(`AN${Row + 7}:AP${Row + 8}`);
    ws.mergeCells(`AJ${Row + 9}:AM${Row + 10}`);
    ws.mergeCells(`AN${Row + 9}:AP${Row + 10}`);

    ws.getRow(Row + 8).height = 30;

    // DATA
    const nameCell = ws.getCell(`A${Row}`);
    nameCell.value = employeeName;
    nameCell.border = cellBorder;
    nameCell.alignment = cellAlignment;
    nameCell.font = cellFont(16);

    const workedHoursCell = ws.getCell(`G${Row}`);
    workedHoursCell.value = parseInt(employeeWorkedHours, 10);
    workedHoursCell.border = cellBorder;
    workedHoursCell.alignment = cellAlignment;
    workedHoursCell.font = cellFont(24);

    const hoursCell = ws.getCell(`I${Row}`);
    hoursCell.value = "h";
    hoursCell.border = cellBorder;
    hoursCell.alignment = cellAlignment;
    hoursCell.font = cellFont(24);

    const employeeEarningsPerHour = ws.getCell(`K${Row}`);
    employeeEarningsPerHour.value = earnings;
    employeeEarningsPerHour.border = cellBorder;
    employeeEarningsPerHour.alignment = cellAlignment;
    employeeEarningsPerHour.font = cellFont(24);

    const earningsCell = ws.getCell(`M${Row}`);
    earningsCell.value = "zł/h";
    earningsCell.border = cellBorder;
    earningsCell.alignment = cellAlignment;
    earningsCell.font = cellFont(24);

    // DATA - table
    const daysCell = ws.getCell(`A${Row + 2}`);
    daysCell.value = "Dni";
    daysCell.border = cellBorder;
    daysCell.alignment = cellAlignment;
    daysCell.font = cellFont(11, false);
    daysCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };

    const flatCell = ws.getCell(`A${Row + 3}`);
    flatCell.value = "Płaskie";
    flatCell.border = cellBorder;
    flatCell.alignment = cellAlignment;
    flatCell.font = cellFont(16);
    flatCell.font.color = { argb: "009e08" };

    const cncCell = ws.getCell(`A${Row + 5}`);
    cncCell.value = "CNC";
    cncCell.border = cellBorder;
    cncCell.alignment = cellAlignment;
    cncCell.font = cellFont(16);

    const sumCell = ws.getCell(`A${Row + 8}`);
    sumCell.value = "SUMA";
    sumCell.border = cellBorder;
    sumCell.alignment = cellAlignment;
    sumCell.font = cellFont(16);
    sumCell.font.color = { argb: "c98d00" };

    const flatOneSideCell = ws.getCell(`C${Row + 3}`);
    flatOneSideCell.value = "Jednostronne";
    flatOneSideCell.border = cellBorder;
    flatOneSideCell.alignment = cellAlignment;
    flatOneSideCell.font = cellFont(11, false);

    const flatBothSidesCell = ws.getCell(`C${Row + 4}`);
    flatBothSidesCell.value = "Obustronne";
    flatBothSidesCell.border = cellBorder;
    flatBothSidesCell.alignment = cellAlignment;
    flatBothSidesCell.font = cellFont(11, false);
    flatBothSidesCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e6e6e6" }
    };

    const cncOneSideCell = ws.getCell(`C${Row + 5}`);
    cncOneSideCell.value = "Jednostronne";
    cncOneSideCell.border = cellBorder;
    cncOneSideCell.alignment = cellAlignment;
    cncOneSideCell.font = cellFont(11, false);

    const cncBothSidesCell = ws.getCell(`C${Row + 6}`);
    cncBothSidesCell.value = "Obustronne";
    cncBothSidesCell.border = cellBorder;
    cncBothSidesCell.alignment = cellAlignment;
    cncBothSidesCell.font = cellFont(11, false);
    cncBothSidesCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e6e6e6" }
    };

    const summaryCell = ws.getCell(`AJ${Row + 2}`);
    summaryCell.value = "SUMA";
    summaryCell.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    summaryCell.alignment = cellAlignment;
    summaryCell.font = cellFont(11);
    summaryCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "c7c7c7" }
    };
    // console.log(values);
    stats.days.forEach((day, index) => {
      const values = day[position.toLowerCase()];

      const letter = columnsForEmployeesReport[index];
      const dayCell = ws.getCell(`${letter}${Row + 2}`);
      dayCell.value = index + 1;
      dayCell.border = cellBorder;
      dayCell.alignment = cellAlignment;
      dayCell.font = cellFont(11, false);
      dayCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c7c7c7" }
      };

      const flatOneSideCell = ws.getCell(`${letter}${Row + 3}`);
      flatOneSideCell.value = values.flatOneSide ? values.flatOneSide : "";
      flatOneSideCell.border = cellBorder;
      flatOneSideCell.alignment = cellAlignment;
      flatOneSideCell.font = cellFont(11, false);

      const flatBothSidesCell = ws.getCell(`${letter}${Row + 4}`);
      flatBothSidesCell.value = values.flatBothSides
        ? values.flatBothSides
        : "";
      flatBothSidesCell.border = cellBorder;
      flatBothSidesCell.alignment = cellAlignment;
      flatBothSidesCell.font = cellFont(11, false);
      flatBothSidesCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "e6e6e6" }
      };

      const cncOneSideCell = ws.getCell(`${letter}${Row + 5}`);
      cncOneSideCell.value = values.cncOneSide ? values.cncOneSide : "";
      cncOneSideCell.border = cellBorder;
      cncOneSideCell.alignment = cellAlignment;
      cncOneSideCell.font = cellFont(11, false);

      const cncBothSidesCell = ws.getCell(`${letter}${Row + 6}`);
      cncBothSidesCell.value = values.cncBothSides ? values.cncBothSides : "";
      cncBothSidesCell.border = cellBorder;
      cncBothSidesCell.alignment = cellAlignment;
      cncBothSidesCell.font = cellFont(11, false);
      cncBothSidesCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "e6e6e6" }
      };

      const sumCell = ws.getCell(`${letter}${Row + 8}`);
      sumCell.value = {
        formula: `=SUM(${letter}${Row + 3}:${letter}${Row + 6})`
      };
      sumCell.border = cellBorder;
      sumCell.alignment = cellAlignment;
      sumCell.font = cellFont(11, false);
    });

    const flatOneSideSummary = ws.getCell(`AJ${Row + 3}`);
    flatOneSideSummary.value = {
      formula: `=SUM(E${Row + 3}:AI${Row + 3})`
    };
    flatOneSideSummary.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    flatOneSideSummary.alignment = cellAlignment;
    flatOneSideSummary.font = cellFont();

    const flatBothSidesSummary = ws.getCell(`AJ${Row + 4}`);
    flatBothSidesSummary.value = {
      formula: `=SUM(E${Row + 4}:AI${Row + 4})`
    };
    flatBothSidesSummary.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    flatBothSidesSummary.alignment = cellAlignment;
    flatBothSidesSummary.font = cellFont();
    flatBothSidesSummary.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e6e6e6" }
    };

    const cncOneSideSummary = ws.getCell(`AJ${Row + 5}`);
    cncOneSideSummary.value = {
      formula: `=SUM(E${Row + 5}:AI${Row + 5})`
    };
    cncOneSideSummary.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    cncOneSideSummary.alignment = cellAlignment;
    cncOneSideSummary.font = cellFont();

    const cncBothSidesSummary = ws.getCell(`AJ${Row + 6}`);
    cncBothSidesSummary.value = {
      formula: `=SUM(E${Row + 6}:AI${Row + 6})`
    };
    cncBothSidesSummary.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    cncBothSidesSummary.alignment = cellAlignment;
    cncBothSidesSummary.font = cellFont();
    cncBothSidesSummary.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "e6e6e6" }
    };

    const flatSummary = ws.getCell(`AK${Row + 3}`);
    flatSummary.border = cellBorder;
    flatSummary.alignment = cellAlignment;
    flatSummary.value = {
      formula: `=SUM(AJ${Row + 3}:AJ${Row + 4})`
    };
    flatSummary.font = cellFont(18);
    flatSummary.font.color = { argb: "009e08" };

    const flatSummaryPercent = ws.getCell(`AM${Row + 3}`);
    flatSummaryPercent.border = cellBorder;
    flatSummaryPercent.alignment = cellAlignment;
    flatSummaryPercent.value = {
      formula: `(AK${Row + 3}/AN${Row + 3})*100`
    };
    flatSummaryPercent.font = cellFont(10);
    flatSummaryPercent.font.color = { argb: "757575" };

    const cncSummary = ws.getCell(`AK${Row + 5}`);
    cncSummary.border = cellBorder;
    cncSummary.alignment = cellAlignment;
    cncSummary.value = {
      formula: `=SUM(AJ${Row + 5}:AJ${Row + 6})`
    };
    cncSummary.font = cellFont(18);
    cncSummary.font.color = { argb: "009e08" };

    const cncSummaryPercent = ws.getCell(`AM${Row + 5}`);
    cncSummaryPercent.border = cellBorder;
    cncSummaryPercent.alignment = cellAlignment;
    cncSummaryPercent.value = {
      formula: `(AK${Row + 5}/AN${Row + 3})*100`
    };
    cncSummaryPercent.font = cellFont(10);
    cncSummaryPercent.font.color = { argb: "757575" };

    const summary = ws.getCell(`AN${Row + 3}`);
    summary.border = cellBorder;
    summary.alignment = cellAlignment;
    summary.value = {
      formula: `=SUM(AK${Row + 3}:AK${Row + 5})`
    };
    summary.font = cellFont(28);
    summary.font.color = { argb: "0073ff" };

    // M2/H
    const efficiencyCell = ws.getCell(`AJ${Row + 8}`);
    efficiencyCell.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    efficiencyCell.alignment = cellAlignment;
    efficiencyCell.value = "m2/h";
    efficiencyCell.font = cellFont(22);

    const efficiencyValueCell = ws.getCell(`AN${Row + 8}`);
    efficiencyValueCell.border = cellBorder;
    efficiencyValueCell.alignment = cellAlignment;
    efficiencyValueCell.value = {
      formula: `AN${Row + 3}/G${Row}`
    };
    efficiencyValueCell.font = cellFont(28);
    efficiencyValueCell.font.color = { argb: "008004" };

    // zł/m2

    const priceForMeter = ws.getCell(`AJ${Row + 9}`);
    priceForMeter.border = {
      top: { style: "medium" },
      left: { style: "thick" },
      bottom: { style: "medium" },
      right: { style: "medium" }
    };
    priceForMeter.alignment = cellAlignment;
    priceForMeter.value = "zł/m2";
    priceForMeter.font = cellFont(22);

    const priceForMeterValue = ws.getCell(`AN${Row + 9}`);
    priceForMeterValue.border = cellBorder;
    priceForMeterValue.alignment = cellAlignment;
    priceForMeterValue.value = {
      formula: `(G${Row}*K${Row})/AN${Row + 3}`
    };
    priceForMeterValue.font = cellFont(28);
    priceForMeterValue.font.color = { argb: "008004" };

    Row += 11;
  }

  const file = await wb.xlsx.writeFile(`${filePath}${fileName}`);

  console.log("### REPORT GENERATED ###");

  return file;
};

module.exports = employeesReportGenerate;
