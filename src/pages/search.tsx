import React, { useState, useMemo } from 'react';
import posts from '../data/posts.json';
import { Container, Typography, TextField, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useLanguage } from '../components/LanguageContext';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { language } = useLanguage();
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return posts.filter(post =>
      post.language === language &&
      ((post.title && post.title.toLowerCase().includes(q)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
      (post.content_html && post.content_html.toLowerCase().includes(q)))
    );
  }, [query, language]);

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
          <React.Fragment key={res.title + res.date}>
            <ListItem button component={Link} href={`/${getSlugFromUrl(res.url || '')}`}>
              <ListItemText
                primary={res.title}
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondary">
                      {res.date ? new Date(res.date).toLocaleDateString() : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {res.excerpt}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {idx < results.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      {query && results.length === 0 && (
        <Typography variant="body2" color="text.secondary">No results found.</Typography>
      )}
    </Container>
  );
};

export default SearchPage; 