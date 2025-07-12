import React from 'react';
import posts from '../../data/posts.json';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Link from 'next/link';
import { useLanguage } from '../../components/LanguageContext';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

const PhotosPage = () => {
  const { language } = useLanguage();
  const photoPosts = posts.filter(post => post.language === language && post.images && post.images.length > 0);
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
        Photos
      </Typography>
      <List>
        {photoPosts.map((post, idx) => (
          <React.Fragment key={post.title + post.date}>
            <ListItem alignItems="flex-start" component={Link} href={`/${getSlugFromUrl(post.url || '')}`} button>
              <ListItemText
                primary={<Typography variant="h6" fontWeight={600}>{post.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondary">
                      {post.date ? new Date(post.date).toLocaleDateString() : ''}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {post.images.map((src: string, i: number) => (
                        <img key={i} src={src} alt="" style={{ maxWidth: 120, maxHeight: 80, objectFit: 'cover', borderRadius: 4 }} />
                      ))}
                    </Box>
                  </>
                }
              />
            </ListItem>
            {idx < photoPosts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default PhotosPage; 