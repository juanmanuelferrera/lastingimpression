import React from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PostList from '../components/PostList';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <LanguageSwitcher />
    </Box>
    <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
      Lasting Impression
    </Typography>
    <Typography variant="h5" color="text.secondary" gutterBottom>
      Honoring the works and legacy of Hanuman das (Hrvoje Marjanovic)
    </Typography>
    <Typography variant="body1" sx={{ my: 3 }}>
      Lasting Impression is a digital archive and blog dedicated to the works and legacy of Hanuman das (Hrvoje Marjanovic). A passionate and outspoken voice in the Krishna consciousness community, Hanuman das created a vast collection of articles, videos, and resources exploring philosophy, culture, and spiritual life. This site preserves his writings, media, and insights for future generations, honoring his memory and contributions.
    </Typography>
    <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 2 }}>
      Latest Posts
    </Typography>
    <PostList />
  </Container>
);

export default HomePage; 