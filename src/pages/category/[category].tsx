import React from 'react';
import { useRouter } from 'next/router';
import posts from '../../data/posts.json';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import PDFExportListButton from '../../components/PDFExportListButton';
import { useLanguage } from '../../components/LanguageContext';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { language } = useLanguage();
  const filtered = posts.filter(post =>
    post.language === language &&
    post.categories && post.categories.some((cat: string) => cat.toLowerCase().replace(/\s+/g, '-') === category)
  );

  if (!filtered.length) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" color="error" gutterBottom>Category: {category}</Typography>
        <Typography variant="body1" color="text.secondary">No posts found in this category for the selected language.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <PDFExportListButton posts={filtered} filename={`category-${category}.pdf`} />
      <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
        Category: {category}
      </Typography>
      <List>
        {filtered.map((post, idx) => (
          <React.Fragment key={post.title + post.date}>
            <ListItem component={Link} href={`/${getSlugFromUrl(post.url || '')}`} alignItems="flex-start" button>
              <ListItemText
                primary={<Typography variant="h6" fontWeight={600}>{post.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondary">
                      {post.date ? new Date(post.date).toLocaleDateString() : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {post.excerpt}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {idx < filtered.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default CategoryPage; 