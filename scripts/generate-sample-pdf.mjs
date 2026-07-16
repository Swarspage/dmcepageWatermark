import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

async function generateSample() {
  const sampleBeforePath = path.join(rootDir, 'public', 'sample-before.jpg');
  const headerPath = path.join(rootDir, 'public', 'header.png');
  const watermarkPath = path.join(rootDir, 'public', 'watermark.png');
  const outputPath = path.join(rootDir, 'public', 'sample-after.pdf');

  if (!fs.existsSync(sampleBeforePath) || !fs.existsSync(headerPath) || !fs.existsSync(watermarkPath)) {
    console.error('Missing assets required for sample generation.');
    return;
  }

  const sampleBeforeBytes = fs.readFileSync(sampleBeforePath);
  const headerBytes = fs.readFileSync(headerPath);
  const watermarkBytes = fs.readFileSync(watermarkPath);

  const outputPdfDoc = await PDFDocument.create();
  const headerHeight = 80;

  const headerImage = await outputPdfDoc.embedPng(headerBytes);
  const watermarkImage = await outputPdfDoc.embedPng(watermarkBytes);
  const embeddedImg = await outputPdfDoc.embedJpg(sampleBeforeBytes);

  // Standard A4 page (595.28 x 841.89)
  const width = 595.28;
  const height = 841.89;
  const newPage = outputPdfDoc.addPage([width, height]);

  // Draw Watermark
  const wmWidth = width * 0.6;
  const wmScaleFactor = wmWidth / watermarkImage.width;
  const wmHeight = watermarkImage.height * wmScaleFactor;

  newPage.drawImage(watermarkImage, {
    x: (width - wmWidth) / 2,
    y: (height - wmHeight) / 2,
    width: wmWidth,
    height: wmHeight,
    opacity: 0.12,
  });

  // Draw Header
  newPage.drawImage(headerImage, {
    x: 0,
    y: height - headerHeight,
    width: width,
    height: headerHeight,
  });

  // Fit image below header
  const availWidth = width - 48;
  const availHeight = height - headerHeight - 48;
  const imgScale = Math.min(availWidth / embeddedImg.width, availHeight / embeddedImg.height, 1);
  const drawW = embeddedImg.width * imgScale;
  const drawH = embeddedImg.height * imgScale;
  const drawX = (width - drawW) / 2;
  const drawY = (availHeight - drawH) / 2;

  newPage.drawImage(embeddedImg, {
    x: drawX,
    y: drawY,
    width: drawW,
    height: drawH,
  });

  const pdfBytes = await outputPdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Successfully generated public/sample-after.pdf');
}

generateSample().catch(console.error);
