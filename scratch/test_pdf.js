const pdf = require('pdf-parse');
console.log('Type of pdf.PDFParse:', typeof pdf.PDFParse);
if (typeof pdf.PDFParse === 'function') {
    try {
        console.log('Stringified pdf.PDFParse:', pdf.PDFParse.toString().substring(0, 100));
    } catch (e) {}
}
