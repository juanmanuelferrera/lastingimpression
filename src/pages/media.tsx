import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';

const mediaSections = [
  { name: 'Videos', href: '/media/videos' },
  { name: 'Audio', href: '/media/audio' },
  { name: 'Photos', href: '/media/photos' },
];

const MediaPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Media
    </Typography>
    <List>
      {mediaSections.map((section, idx) => (
        <React.Fragment key={section.name}>
          <ListItem button component={Link} href={section.href}>
            <ListItemText primary={section.name} />
          </ListItem>
          {idx < mediaSections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default MediaPage; 