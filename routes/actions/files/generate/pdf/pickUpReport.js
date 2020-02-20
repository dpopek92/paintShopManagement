const PDFDocument = require("pdfkit");
const fse = require("fs-extra");
const { dateToString } = require("../../../../utils/date");

// *
const pickUpReportGenerate = async (
  user,
  order,
  pickedUpElements,
  filePath,
  fileName
) => {
  const doc = new PDFDocument();

  const date = new Date();

  console.log("Start PDF Generate");
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fse.createWriteStream(`${filePath}${fileName}`));

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image("./files/pickupReport/logo.jpg", 10, 10, {
    height: 40
  });
  doc.image("./files/pickupReport/footer.png", 40, 690, {
    width: 525
  });

  // Embed a font, set the font size, and render some text

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(28)
    .text("Protokół odbioru frontów", 150, 70);

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text("Nazwa firmy:", 60, 134);
  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(16)
    .text(`${user.company}`, 150, 130);

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text(`Data:`, 60, 154);
  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(16)
    .text(`${dateToString(date)}`, 150, 150);

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(20)
    .text(`Odebrane zamówienie`, 210, 220);

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(16)
    .text(
      `Numer: ${order.number},\nNazwa: ${
        order.name ? order.name : "-"
      },\nKolor: ${order.color} ${order.paintType},\nIlość elementów: ${
        order.elements
      } szt., odebrano: ${pickedUpElements ? pickedUpElements : "...."} szt.`,
      80,
      280
    );

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text(
      "Zamówienia odebrane bez zastrzeżeń ilościowych i jakościowych.\nNiniejszy protokół stanowi podstawę do wystawienia przez Wykonawcę faktury za dostarczone elementy meblowe oraz meble.\nProtokół sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.",
      80,
      450
    );

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text(".......................................", 48, 650);
  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text("Podpis przedstawiciela wykonawcy", 48, 665);

  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text(".......................................", 430, 650, {
      align: "right",
      lineBreak: false
    });
  doc
    .font("./files/pickupReport/arial.ttf")
    .fontSize(12)
    .text("Podpis Klienta", 482, 665, {
      align: "right",
      lineBreak: false
    });

  // Finalize PDF file
  doc.end();
  console.log("PDF Done!");
  return;
};

module.exports = pickUpReportGenerate;
