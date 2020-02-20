const reasonsOfComplaint = [
  { type: "Paproch", name: "particle" },
  { type: "Uszkodzenie mechaniczne", name: "mechanicalDamage" },
  { type: "Uszkodzony laminat", name: "damagedLaminate" },
  { type: "Zaciek", name: "bruise" },
  { type: "Element źle polakierowany", name: "badlyPainted" },
  { type: "Niepolakierowana druga strona", name: "leftSide" },
  { type: "Przetarcie", name: "polishingHole" },
  { type: "Inny", name: "other" }
];

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];

const columnsForEmployeesReport = [
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "AB",
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AI"
];

module.exports = { reasonsOfComplaint, months, columnsForEmployeesReport };
