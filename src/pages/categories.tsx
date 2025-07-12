import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import posts from '../data/posts.json';

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

const categoryMap: Record<string, number> = {};
posts.forEach(post => {
  (post.categories || []).forEach((cat: string) => {
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
});
const categories = Object.entries(categoryMap);

const CategoriesPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Categories
    </Typography>
    <List>
      {categories.map(([cat, count], idx) => (
        <React.Fragment key={cat}>
          <ListItem component={Link} href={`/category/${slugify(cat)}`} button>
            <ListItemText primary={cat} secondary={`${count} posts`} />
          </ListItem>
          {idx < categories.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default CategoriesPage; 