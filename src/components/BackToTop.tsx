import React, { useEffect, useState } from 'react';
import { Fab, Zoom } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200 }}
        aria-label="Back to top"
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTop; 