const calculateDiscounts = (globalPrices, userDiscounts) => {
  const values = {
    companyMaterial: { gloss: {}, semiGloss: {}, board: {} },
    customerMaterial: { gloss: {}, semiGloss: {} },
    services: {}
  };

  Object.keys(globalPrices).forEach(key => {
    const globalCategory = globalPrices[key];
    const discountCategory = userDiscounts[key];
    Object.keys(globalCategory).forEach(key2 => {
      const globalField = globalCategory[key2];
      const discountField = discountCategory[key2];

      if (typeof globalField === "object") {
        Object.keys(globalField).forEach(key3 => {
          const globalItem = globalField[key3];
          const discountItem = discountField[key3];

          values[key][key2][key3] = globalItem - discountItem;
        });
      } else {
        values[key][key2] = globalField - discountField;
      }
    });
  });
  return values;
};

module.exports = { calculateDiscounts };
