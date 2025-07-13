import React from 'react';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';

interface Post {
  title?: string;
  url?: string;
  author?: string;
  date?: string;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  content_html?: string;
  images?: string[];
  videos?: any[];
  language?: string;
}

interface PDFExportListButtonProps {
  posts: Post[];
  filename?: string;
}

const PDFExportListButton: React.FC<PDFExportListButtonProps> = ({ posts, filename = 'posts.pdf' }) => {
  const handleExport = () => {
    const pdf = new jsPDF();
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;

    // Add title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Posts List', margin, yPosition);
    yPosition += 20;

    // Add posts
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    posts.forEach((post, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      // Add post title
      pdf.setFont('helvetica', 'bold');
      const title = post.title?.length > 50 ? post.title.substring(0, 50) + '...' : post.title;
      pdf.text(`${index + 1}. ${title}`, margin, yPosition);
      yPosition += lineHeight;

      // Add date if available
      if (post.date) {
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(10);
        pdf.text(`Date: ${new Date(post.date).toLocaleDateString()}`, margin + 10, yPosition);
        yPosition += lineHeight;
      }

      // Add excerpt if available
      if (post.excerpt) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const excerpt = post.excerpt.length > 80 ? post.excerpt.substring(0, 80) + '...' : post.excerpt;
        pdf.text(excerpt, margin + 10, yPosition);
        yPosition += lineHeight * 2;
      } else {
        yPosition += lineHeight;
      }
    });

    pdf.save(filename);
  };

  return (
    <Button variant="outlined" size="small" onClick={handleExport} sx={{ float: 'right', mb: 2 }}>
      Export List as PDF
    </Button>
  );
};

export default PDFExportListButton; 