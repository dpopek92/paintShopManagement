const websiteAddress = "https://---adres---.pl/";
const companyName = "FIRMA";
const adminEmailAddress = "d.popek92@gmail.com";

const productionStates = [
  "Surówka",
  "Podkład",
  "Szlifiernia",
  "Lakiernia",
  "Polernia",
  "Pakowanie",
  "Zakończone"
];
const positionsForTimetables = [
  "Surówka",
  "Podkład",
  "Szlifiernia",
  "Lakiernia",
  "Polernia",
  "Pakowanie",
  "Transport"
];

const historyUpdateKeys = {
  number: "Numer",
  orderType: "Typ zamówienia",
  name: "Nazwa",
  productionFinishDate: "Data realizacji",
  productionStatus: "Status",
  color: "Kolor",
  paintType: "Matowość",
  chamfering: "Gierowanie",
  backMilling: "Frezowanie pod plecy",
  paintStyle: "Rodzaj lakierowania",
  millingSymbol: "Rodzaj frezowania",
  glassCaseSymbol: "Rodzaj witryny",
  veneerSymbol: "Rodzaj forniru",
  handleSymbol1: "Rodzaj uchwytu(1)",
  handleSymbol2: "Rodzaj uchwytu(2)",
  elements: "Liczba elementów",
  surfaceRight: "Powierzchnia (PL) [m2]",
  surfaceLeft: "Powierzchnia (PL) [m2]",
  surfaceCNC: "Powierzchnia (CNC) [m2]",
  milledHandle: "Uchwyt frez. [m.b]",
  hingesHoles: "Liczba puszek",
  price: "cena"
};
const historyUpdateSkippedKeys = [
  "user",
  "paintMaker",
  "date",
  "customMilling",
  "finishDate",
  "price",
  "updateHistory",
  "status",
  "isFlat",
  "items",
  "production",
  "inProduction",
  "manHours",
  "isPaintOrdered",
  "forwardToGriding",
  "isLostElements",
  "isNut",
  "isFelc",
  "isChamfering",
  "isLeftSidesInProduction",
  "isPaid",
  "isHalfGriding",
  "wasInGriding",
  "status",
  "priority",
  "isReadyToPickUp",
  "productionStatus",
  "painMaker",
  "paintMakerBase",
  "comments",
  "_id",
  "number",
  "finishDate",
  "productionFinishDate",
  "productionHistory",
  "employeesComments"
];

const keysToSkippOrdersUpdate = [
  "user",
  "paintMaker",
  "date",
  "finishDate",
  "price",
  "updateHistory",
  "status",
  "production",
  "inProduction",
  "manHours",
  "isPaintOrdered",
  "forwardToGriding",
  "isLostElements",
  "isPaid",
  "isHalfGriding",
  "wasInGriding",
  "status",
  "priority",
  "isReadyToPickUp",
  "productionStatus",
  "paintMakerBase",
  "_id",
  "number",
  "finishDate",
  "productionFinishDate",
  "productionHistory",
  "employeesComments"
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

const weekDays = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota"
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

module.exports = {
  productionStates,
  historyUpdateKeys,
  historyUpdateSkippedKeys,
  keysToSkippOrdersUpdate,
  columnsForEmployeesReport,
  months,
  positionsForTimetables,
  weekDays,
  websiteAddress,
  companyName,
  adminEmailAddress
};
