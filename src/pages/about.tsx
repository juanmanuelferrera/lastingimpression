import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      About Hanuman das
    </Typography>
    <Typography variant="body1" sx={{ my: 3 }}>
      Hanuman das (Hrvoje Marjanovic) was a passionate and outspoken voice in the Krishna consciousness community. Through his blog, videos, and writings, he explored philosophy, culture, and spiritual life with honesty and courage. This archive preserves his work for future generations, honoring his memory and contributions.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
      All content © Hanuman das (Hrvoje Marjanovic). Preserved for educational and archival purposes.
    </Typography>
  </Container>
);

export default AboutPage; 