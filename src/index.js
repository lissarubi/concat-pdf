const PDFDocument = require('pdf-lib').PDFDocument;
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const colors = require('colors');

// get the path (if exists)
var path = '';
argv.p != undefined
  ? (path = argv.p)
  : argv.path != undefined
  ? (path = argv.path)
  : (path = 'merged.pdf');

async function mergePdf() {
  if (argv.f != undefined) {
    let fileNames = argv.f.split(',');
    const files = Array();
    for (i = 0; i < fileNames.length; i++) {
      let currentFile = fileNames[i].replace(/\s+/g, '');
      files.push(fs.readFileSync(currentFile));
    }

    const mergedPdf = await PDFDocument.create();
    for (const pdfBytes of files) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    const buf = await mergedPdf.save(); // Uint8Array

    fs.open(path, 'w', function (err, fd) {
      fs.write(fd, buf, 0, buf.length, null, function (err) {
        fs.close(fd, function () {
          console.log('wrote the PDF successfully'.green.bold);
        });
      });
    });
  }
  if (argv.files != undefined) {
    let fileNames = argv.files.split(',');
    const files = Array();
    for (i = 0; i < fileNames.length; i++) {
      let currentFile = fileNames[i].replace(/\s+/g, '');
      files.push(fs.readFileSync(currentFile));
    }

    const mergedPdf = await PDFDocument.create();
    for (const pdfBytes of files) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    const buf = await mergedPdf.save(); // Uint8Array

    fs.open(path, 'w', function (err, fd) {
      fs.write(fd, buf, 0, buf.length, null, function (err) {
        fs.close(fd, function () {
          console.log('wrote the PDF successfully'.green.bold);
        });
      });
    });
  }
}
mergePdf();
