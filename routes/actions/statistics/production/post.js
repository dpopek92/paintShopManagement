const StatsProduction = require("../../../../models/StatsProduction");

// *
const createProductionStatsDocument = async (year, month) => {
  const document = await new StatsProduction({ year, month });
  for (let i = 0; i < 31; i++) {
    document.days.push({
      nowe: { orders: [] },
      surówka: { orders: [], employees: [] },
      podkład: { orders: [], employees: [] },
      szlifiernia: { orders: [], employees: [] },
      lakiernia: { orders: [], employees: [] },
      polernia: { orders: [], employees: [] },
      pakowanie: { orders: [], employees: [] },
      odebrane: { orders: [] }
    });
  }
  await document.save();
  return document;
};

module.exports = { createProductionStatsDocument };
