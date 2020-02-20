const StatsEmplopyees = require("../../../../models/StatsEmployees");

// *
const createEmployeeStatsDocument = async (year, month, employeeId) => {
  const document = await new StatsEmplopyees({ year, month, employeeId });
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

module.exports = { createEmployeeStatsDocument };
