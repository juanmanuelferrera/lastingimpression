import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import posts from '../data/posts.json';
import { useLanguage } from './LanguageContext';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

const PostList = () => {
  const { language } = useLanguage();
  const filteredPosts = posts.filter(post => post.language === language);
  return (
    <List>
      {filteredPosts.map((post, idx) => (
        <React.Fragment key={post.title + post.date}>
          <ListItem component={Link} href={`/${getSlugFromUrl(post.url || '')}`} alignItems="flex-start" button>
            <ListItemText
              primary={
                <Typography variant="h6" fontWeight={600}>{post.title}</Typography>
              }
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
          {idx < filteredPosts.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default PostList; 