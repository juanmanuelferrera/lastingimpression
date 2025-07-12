import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import posts from '../data/posts.json';

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

const tagMap: Record<string, number> = {};
posts.forEach(post => {
  (post.tags || []).forEach((tag: string) => {
    tagMap[tag] = (tagMap[tag] || 0) + 1;
  });
});
const tags = Object.entries(tagMap);

const TagsPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Tags
    </Typography>
    <List>
      {tags.map(([tag, count], idx) => (
        <React.Fragment key={tag}>
          <ListItem component={Link} href={`/tag/${slugify(tag)}`} button>
            <ListItemText primary={tag} secondary={`${count} posts`} />
          </ListItem>
          {idx < tags.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default TagsPage; 