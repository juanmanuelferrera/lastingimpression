import React, { useRef } from 'react';
import { Button, Box, Typography, Divider } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExportListButtonProps {
  posts: any[];
  filename?: string;
  showContent?: boolean;
}

const PDFExportListButton: React.FC<PDFExportListButtonProps> = ({ posts, filename = 'posts.pdf', showContent = false }) => {
  const hiddenRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!hiddenRef.current) return;
    const input = hiddenRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
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
    <>
      <Button variant="outlined" size="small" onClick={handleExport} sx={{ float: 'right', mb: 2 }}>
        Export List as PDF
      </Button>
      <Box ref={hiddenRef} sx={{ display: 'none' }}>
        {posts.map((post, idx) => (
          <Box key={post.title + post.date} sx={{ p: 2, mb: 2, border: '1px solid #eee', borderRadius: 2, background: '#fff' }}>
            <Typography variant="h6" fontWeight={600}>{post.title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {post.date ? new Date(post.date).toLocaleDateString() : ''} | {post.author}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {post.excerpt}
            </Typography>
            {showContent && post.content_html && (
              <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PDFExportListButton; 