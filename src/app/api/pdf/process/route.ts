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

    // Server-side security check: limit file size to 25MB to prevent memory exhaustion / OOM
    const MAX_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of 25MB` },
        { status: 400 }
      );
    }

    // Server-side validation check: verify supported file format (PDF, JPG, PNG)
    const fileName = file.name?.toLowerCase() || '';
    const isPdfType = file.type === 'application/pdf' || fileName.endsWith('.pdf');
    const isJpgType = file.type === 'image/jpeg' || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg');
    const isPngType = file.type === 'image/png' || fileName.endsWith('.png');

    if (!isPdfType && !isJpgType && !isPngType) {
      return NextResponse.json({ error: 'Invalid file format. Supported types: PDF, JPG, and PNG.' }, { status: 400 });
    }

    const inputPdfBuffer = await file.arrayBuffer();

    // Load assets safely
    const headerPath = path.join(process.cwd(), 'public', 'header.png');
    const watermarkPath = path.join(process.cwd(), 'public', 'watermark.png');

    if (!fs.existsSync(headerPath) || !fs.existsSync(watermarkPath)) {
      console.error('Missing stamp assets:', { headerPath, watermarkPath });
      return NextResponse.json(
        { error: 'Stamping assets (header.png or watermark.png) missing from server /public directory.' },
        { status: 500 }
      );
    }

    const headerBytes = fs.readFileSync(headerPath);
    const watermarkBytes = fs.readFileSync(watermarkPath);

    const outputPdfDoc = await PDFDocument.create();
    const headerHeight = 80;

    // Embed asset png images
    const headerImage = await outputPdfDoc.embedPng(headerBytes);
    const watermarkImage = await outputPdfDoc.embedPng(watermarkBytes);

    if (isPdfType) {
      const inputPdfDoc = await PDFDocument.load(inputPdfBuffer);
      const pageCount = inputPdfDoc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const originalPage = inputPdfDoc.getPage(i);
        const { width, height } = originalPage.getSize();

        const newPage = outputPdfDoc.addPage([width, height]);

        const wmWidth = width * 0.6;
        const wmScaleFactor = wmWidth / watermarkImage.width;
        const wmHeight = watermarkImage.height * wmScaleFactor;

        newPage.drawImage(watermarkImage, {
          x: (width - wmWidth) / 2,
          y: (height - headerHeight - wmHeight) / 2,
          width: wmWidth,
          height: wmHeight,
          opacity: 0.25,
        });

        newPage.drawImage(headerImage, {
          x: 0,
          y: height - headerHeight,
          width: width,
          height: headerHeight,
        });

        const scale = (height - headerHeight) / height;
        const scaledWidth = width * scale;
        const xOffset = (width - scaledWidth) / 2;

        const [embeddedPage] = await outputPdfDoc.embedPages([originalPage]);
        newPage.drawPage(embeddedPage, {
          x: xOffset,
          y: 0,
          width: scaledWidth,
          height: height - headerHeight,
        });
      }
    } else {
      // JPG or PNG Image input: convert to a stamped A4 PDF page
      const embeddedImg = isJpgType
        ? await outputPdfDoc.embedJpg(inputPdfBuffer)
        : await outputPdfDoc.embedPng(inputPdfBuffer);

      // Create standard A4 page (595.28 x 841.89)
      const width = 595.28;
      const height = 841.89;
      const newPage = outputPdfDoc.addPage([width, height]);

      const wmWidth = width * 0.6;
      const wmScaleFactor = wmWidth / watermarkImage.width;
      const wmHeight = watermarkImage.height * wmScaleFactor;

      newPage.drawImage(watermarkImage, {
        x: (width - wmWidth) / 2,
        y: (height - headerHeight - wmHeight) / 2,
        width: wmWidth,
        height: wmHeight,
        opacity: 0.25,
      });

      newPage.drawImage(headerImage, {
        x: 0,
        y: height - headerHeight,
        width: width,
        height: headerHeight,
      });

      // Fit image neatly into the space below the header with a 24px margin
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
    }

    const pdfBytes = await outputPdfDoc.save();
    const originalBaseName = file.name ? file.name.replace(/\.[^/.]+$/, "") : "document";

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Disposition': `attachment; filename="Watermarked_${originalBaseName}.pdf"`,
        'Content-Type': 'application/pdf',
      },
    });

  } catch (error: any) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
