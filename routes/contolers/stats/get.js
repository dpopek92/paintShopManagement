const {
  getAllProductionStatsDocuments,
  getProductionStatsDocumentByDate
} = require("../../actions/statistics/production/get");
const {
  getAllEmployeeStatsDocuments,
  getEmployeeStatsDocumentByDate,
  getEmployeesWorkedHours
} = require("../../actions/statistics/employees/get");
const {
  createEmployeeStatsDocument
} = require("../../actions/statistics/employees/post");
const {
  createProductionStatsDocument
} = require("../../actions/statistics/production/post");
const {
  getMonthSummary
} = require("../../actions/statistics/production/calculations");
const {
  customerSummary
} = require("../../actions/statistics/customers/calculations");
const {
  getPickedupOrdersInMonth,
  getCustomerPickedupOrdersInMonth,
  getCustomerPickedupOrdersInYear
} = require("../../actions/orders/get");
const { getYearsFromArray } = require("../../utils/functions");

const get = {
  productionYears: async (req, res) => {
    try {
      const documents = await getAllProductionStatsDocuments();
      const years = await getYearsFromArray(documents);

      return res.json(years);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  employeeYears: async (req, res) => {
    const { employeeId } = req.params;
    try {
      const documents = await getAllEmployeeStatsDocuments(employeeId);
      const years = await getYearsFromArray(documents);

      return res.json(years);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  productionStatsByDate: async (req, res) => {
    const { year, month } = req.body;
    try {
      let document = await getProductionStatsDocumentByDate(year, month);
      if (!document) {
        document = await createProductionStatsDocument(year, month);
      }

      return res.json(document);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  employeeStatsByDate: async (req, res) => {
    const { employeeId } = req.params;
    const { year, month } = req.body;
    try {
      let document = await getEmployeeStatsDocumentByDate(
        year,
        month,
        employeeId
      );
      if (!document) {
        document = await createEmployeeStatsDocument(year, month, employeeId);
      }

      return res.json(document);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  productionMonthSummary: async (req, res) => {
    const { year, month } = req.body;
    try {
      const orders = await getPickedupOrdersInMonth(year, month);
      const data = await getMonthSummary(orders);

      return res.json(data);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  customerMonthSummary: async (req, res) => {
    const { customerId, year, month } = req.body;
    try {
      const orders = await getCustomerPickedupOrdersInMonth(
        customerId,
        year,
        month
      );
      const data = await customerSummary(orders);

      return res.json(data);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  customerYearSummary: async (req, res) => {
    const { customerId, year } = req.body;
    try {
      const orders = await getCustomerPickedupOrdersInYear(customerId, year);
      const data = await customerSummary(orders);

      return res.json(data);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  },

  employeeWorkedHours: async (req, res) => {
    const { month, year } = req.body;
    try {
      const hours = await getEmployeesWorkedHours(year, month);
      return res.json(hours);
    } catch (err) {
      console.log(req.originalUrl);
      console.error(err);
      res.status(500).send("server error");
    }
  }
};

module.exports = { get };
