const StatsEmplopyees = require("../../../../models/StatsEmployees");

const createDocument = async (year, month, employee) => {
  console.log("Create Employee Stats Document");
  const document = await new StatsEmplopyees({ year, month, employee });
  for (let i = 0; i < 31; i++) {
    document.days.push({
      surówka: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      },
      podkład: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      },
      szlifiernia: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      },
      lakiernia: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      },
      polernia: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      },
      pakowanie: {
        selfMadeOrders: [],
        NotSelfMadeOrders: []
      }
    });
  }
  await document.save();
  return document;
};

const findEmployeeDocument = async (year, month, employee) => {
  let document = await StatsEmplopyees.findOne({ year, month, employee });
  if (!document) {
    document = await createDocument(year, month, employee);
  }
  return document;
};

// *
const getEmployeesWorkedHours = async (year, month) => {
  let employees = await StatsEmplopyees.find(
    { year, month },
    "workedHours year month"
  ).populate("employee");
  return employees;
};

// *
const getEmployeesStatsToReport = async (year, month, employees) => {
  const employeesIds = [];
  employees.forEach(item => {
    employeesIds.push(item._id);
  });
  const stats = await StatsEmplopyees.find({
    year,
    month,
    employee: { $in: employeesIds }
  });
  // console.log(stats);
  return stats;
};

// *
const getEmployeeStatsDocumentByDate = async (year, month, employeeId) => {
  const document = await StatsEmplopyees.findOne({
    year,
    month,
    employee: employeeId
  });
  return document;
};

// *
const getAllEmployeeStatsDocuments = async employeeId => {
  return await StatsEmployees.find({ employee: employeeId });
};

module.exports = {
  findEmployeeDocument,
  getEmployeesWorkedHours,
  getEmployeesStatsToReport,
  getAllEmployeeStatsDocuments,
  getEmployeeStatsDocumentByDate
};
