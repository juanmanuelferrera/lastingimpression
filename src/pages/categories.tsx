import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const categories = [
  { name: 'article', count: 42 },
  { name: 'daily_meeting', count: 12 },
  { name: 'censorship', count: 7 },
];

const CategoriesPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Categories
    </Typography>
    <List>
      {categories.map((cat, idx) => (
        <React.Fragment key={cat.name}>
          <ListItem button component="a" href={`#`}>
            <ListItemText primary={cat.name} secondary={`${cat.count} posts`} />
          </ListItem>
          {idx < categories.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default CategoriesPage; 