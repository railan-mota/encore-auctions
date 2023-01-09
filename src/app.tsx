import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
const fs = require('fs/promises');

const addLicensePlate = async () => {
  const drawPlate = (plate: string) => {
    firstPage.drawText(plate, {
      x: 35,
      y: height - 45,
      size: 22,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  };

  const pdfData = await fs.readFile('../invoices/invoice.pdf');
  const pdfDoc = await PDFDocument.load(pdfData);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  //Draw License Plate
  firstPage.drawText('License Plate', {
    x: 5,
    y: height - 32,
    size: 26,
    font: helveticaFontBold,
    color: rgb(0, 0, 0),
  });

  //Draw Walk In
  /* firstPage.drawText('WALK IN', {
    x: 35,
    y: height - 50,
    size: 26,
    font: helveticaFontBold,
    color: rgb(0, 0, 0),
  }); */

  //Draw verify ID
  /*  firstPage.drawText('CHECK ID', {
    x: width - 180,
    y: height - 45,
    size: 30,
    font: helveticaFontBold,
    color: rgb(0.95, 0.1, 0.1),
  }); */

  //Draw Highlight unpaid
  /* firstPage.drawText('UNPAID', {
    x: width / 2 ,
    y: height - 180,
    size: 70,
    font: helveticaFontBold,

    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(32),
  }); */

  const pdfBytes = await pdfDoc.save();
  const finalPDF = await fs.writeFile(
    '../invoices/modifyInvoice.pdf',
    pdfBytes
  );
};

addLicensePlate()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
