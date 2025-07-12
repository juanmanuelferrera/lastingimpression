import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ mt: 8, py: 4, textAlign: 'center', bgcolor: '#f5f5f5' }}>
    <Typography variant="body2" color="text.secondary">
      All content © Hanuman das (Hrvoje Marjanovic). Preserved for educational and archival purposes.<br />
      Website by <MuiLink href="https://github.com/juanmanuelferrera/lastingimpression" target="_blank" rel="noopener noreferrer">lastingimpression</MuiLink>
    </Typography>
  </Box>
);

export default Footer; 