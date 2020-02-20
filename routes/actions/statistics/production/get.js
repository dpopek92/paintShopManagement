const StatsProduction = require("../../../../models/StatsProduction");

const createDocument = async (year, month) => {
  console.log("Create Production Stats Document");
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

const findProductionDocument = async (year, month) => {
  // console.log("findProductionStatDocument");
  let document = await StatsProduction.findOne({ year, month });
  if (!document) {
    document = await createDocument(year, month);
  }

  return document;
};

// *
const getAllProductionStatsDocuments = async () => {
  return await StatsProduction.find();
};

// *
const getProductionStatsDocumentByDate = async (year, month) => {
  const document = await StatsProduction.findOne({ year, month });
  return document;
};

module.exports = {
  findProductionDocument,
  getAllProductionStatsDocuments,
  getProductionStatsDocumentByDate
};
