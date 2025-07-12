import React from 'react';
import posts from '../../data/posts.json';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Link from 'next/link';
import { useLanguage } from '../../components/LanguageContext';

function getSlugFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

// Try to find audio embeds or audio file links in content_html
function extractAudio(post: any) {
  const audioMatches = [];
  if (post.content_html) {
    // Look for <audio src=...> or <audio><source src=...>
    const audioTag = post.content_html.match(/<audio[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (audioTag) audioMatches.push(audioTag[1]);
    const sourceTags = [...post.content_html.matchAll(/<source[^>]*src=["']([^"']+)["'][^>]*>/gi)];
    for (const m of sourceTags) audioMatches.push(m[1]);
    // Look for .mp3/.ogg links
    const fileLinks = [...post.content_html.matchAll(/href=["']([^"']+\.(mp3|ogg))["']/gi)];
    for (const m of fileLinks) audioMatches.push(m[1]);
  }
  return audioMatches;
}

const AudioPage = () => {
  const { language } = useLanguage();
  const audioPosts = posts
    .filter(post => post.language === language)
    .map(post => ({ ...post, audio: extractAudio(post) }))
    .filter(post => post.audio.length > 0);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
        Audio
      </Typography>
      {audioPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">No audio posts found.</Typography>
      ) : (
        <List>
          {audioPosts.map((post, idx) => (
            <React.Fragment key={post.title + post.date}>
              <ListItem alignItems="flex-start" component={Link} href={`/${getSlugFromUrl(post.url || '')}`} button>
                <ListItemText
                  primary={<Typography variant="h6" fontWeight={600}>{post.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="caption" color="text.secondary">
                        {post.date ? new Date(post.date).toLocaleDateString() : ''}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {post.audio.map((src: string, i: number) => (
                          <audio key={i} controls style={{ width: '100%', marginBottom: 8 }} src={src} />
                        ))}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              {idx < audioPosts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AudioPage; 