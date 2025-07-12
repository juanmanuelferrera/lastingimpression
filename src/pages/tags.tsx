import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const tags = [
  { name: 'ISKCON', count: 18 },
  { name: 'philosophy', count: 10 },
  { name: 'controversy', count: 5 },
];

const TagsPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      Tags
    </Typography>
    <List>
      {tags.map((tag, idx) => (
        <React.Fragment key={tag.name}>
          <ListItem button component="a" href={`#`}>
            <ListItemText primary={tag.name} secondary={`${tag.count} posts`} />
          </ListItem>
          {idx < tags.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Container>
);

export default TagsPage; 