import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf') as File;
    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 });
    }

    const inputPdfBuffer = await file.arrayBuffer();

    // Load assets
    const headerPath = path.join(process.cwd(), 'public', 'header.png');
    const watermarkPath = path.join(process.cwd(), 'public', 'watermark.png');

    const headerBytes = fs.readFileSync(headerPath);
    const watermarkBytes = fs.readFileSync(watermarkPath);

    // Load input PDF
    const inputPdfDoc = await PDFDocument.load(inputPdfBuffer);
    const outputPdfDoc = await PDFDocument.create();

    const headerHeight = 80;

    // Embed png images
    const headerImage = await outputPdfDoc.embedPng(headerBytes);
    const watermarkImage = await outputPdfDoc.embedPng(watermarkBytes);

    const pageCount = inputPdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const originalPage = inputPdfDoc.getPage(i);
      const { width, height } = originalPage.getSize();

      // Create new page of same size
      const newPage = outputPdfDoc.addPage([width, height]);

      // Watermark logic (drawn first so it goes behind text/graphics if required, or after)
      // Java code draws watermark first, then header, then body. Let's match it.
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

      // Header logic
      newPage.drawImage(headerImage, {
        x: 0,
        y: height - headerHeight,
        width: width,
        height: headerHeight,
      });

      // Embed the original page content (analogous to LayerUtility form object)
      const [embeddedPage] = await outputPdfDoc.embedPages([originalPage]);
      
      // Draw original page shifted down by headerHeight
      newPage.drawPage(embeddedPage, {
        x: 0,
        y: -headerHeight,
        width: width,
        height: height,
      });
    }

    const pdfBytes = await outputPdfDoc.save();

    // Wrap the Uint8Array in a Node.js Buffer for Vercel/Next.js body support
    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': 'attachment; filename="processed.pdf"',
        'Content-Type': 'application/pdf',
      },
    });

  } catch (error: any) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
