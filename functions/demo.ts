import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";

const generatePdf = async (): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 30;
  page.drawText("Creating PDFs in Serverless is awesome!", {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71)
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
const handler = async (event: any) => {
  const pdfBytes = await generatePdf();
  const buffer = Buffer.from(pdfBytes);

  //   console.log(event);
  //   const stream = String.fromCharCode(...new Uint8Array(arrayBuffer));
  return {
    statusCode: 200,
    headers: {
      "Content-type": "application/pdf"
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true
  };
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
