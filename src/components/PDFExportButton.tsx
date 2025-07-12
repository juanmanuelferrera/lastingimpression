import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExportButtonProps {
  contentId: string;
  filename?: string;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({ contentId, filename = 'post.pdf' }) => {
  const handleExport = async () => {
    const input = document.getElementById(contentId);
    if (!input) return;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    // Add more pages if needed
    let remainingHeight = imgHeight - pageHeight;
    while (remainingHeight > 0) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }
    pdf.save(filename);
  };

  return (
    <Button variant="outlined" size="small" onClick={handleExport} sx={{ float: 'right', mb: 2 }}>
      Export as PDF
    </Button>
  );
};

export default PDFExportButton; 