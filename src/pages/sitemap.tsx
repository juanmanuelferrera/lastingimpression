import React from 'react';
import posts from '../data/posts.json';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Link from 'next/link';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

// Group posts by year
const postsByYear: Record<string, typeof posts> = {};
posts.forEach(post => {
  const year = post.date ? new Date(post.date).getFullYear().toString() : 'Unknown';
  if (!postsByYear[year]) postsByYear[year] = [];
  postsByYear[year].push(post);
});

// Unique categories and tags
const categorySet = new Set<string>();
const tagSet = new Set<string>();
posts.forEach(post => {
  (post.categories || []).forEach((cat: string) => categorySet.add(cat));
  (post.tags || []).forEach((tag: string) => tagSet.add(tag));
});
const categories = Array.from(categorySet);
const tags = Array.from(tagSet);

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

const SitemapPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
      Sitemap
    </Typography>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Categories</Typography>
      <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {categories.map(cat => (
          <ListItem key={cat} component={Link} href={`/category/${slugify(cat)}`} sx={{ width: 'auto' }}>
            <ListItemText primary={cat} />
          </ListItem>
        ))}
      </List>
    </Box>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Tags</Typography>
      <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {tags.map(tag => (
          <ListItem key={tag} component={Link} href={`/tag/${slugify(tag)}`} sx={{ width: 'auto' }}>
            <ListItemText primary={tag} />
          </ListItem>
        ))}
      </List>
    </Box>
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>All Posts</Typography>
      {Object.entries(postsByYear).sort((a, b) => b[0].localeCompare(a[0])).map(([year, yearPosts]) => (
        <Box key={year} sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={500} sx={{ mt: 2 }}>{year}</Typography>
          <List>
            {yearPosts.map(post => (
              <ListItem key={post.title + post.date} component={Link} href={`/${getSlugFromUrl(post.url || '')}`}>
                <ListItemText
                  primary={post.title}
                  secondary={`${post.date ? new Date(post.date).toLocaleDateString() : ''} | ${post.language}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  </Container>
);

export default SitemapPage; 