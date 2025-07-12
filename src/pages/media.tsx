import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const mediaSections = [
  { name: 'Videos', href: '#' },
  { name: 'Audio', href: '#' },
  { name: 'Photos', href: '#' },
];

const MediaPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Media
    </Typography>
    <List>
      {mediaSections.map((section, idx) => (
        <React.Fragment key={section.name}>
          <ListItem button component="a" href={section.href}>
            <ListItemText primary={section.name} />
          </ListItem>
          {idx < mediaSections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default MediaPage; 