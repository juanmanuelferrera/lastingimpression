import React, { useState } from 'react';
import { Container, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  // Placeholder results
  const results = query
    ? [
        { title: 'What is Krishna consciousness', snippet: 'A post about philosophy...' },
        { title: 'Why God allows people to die young', snippet: 'A post about life and death...' },
      ]
    : [];
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
        Search
      </Typography>
      <TextField
        fullWidth
        label="Search the archive..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{ my: 3 }}
      />
      <List>
        {results.map((res, idx) => (
          <ListItem key={idx} button component="a" href="#">
            <ListItemText primary={res.title} secondary={res.snippet} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SearchPage; 