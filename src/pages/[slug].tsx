import React from 'react';
import { useRouter } from 'next/router';
import posts from '../data/posts.json';
import { Container, Typography, Box, Divider } from '@mui/material';
import PDFExportButton from '../components/PDFExportButton';
import SEO from '../components/SEO';
import SocialShare from '../components/SocialShare';

function getSlugFromUrl(url: string) {
  // Extract the last part of the URL as slug
  if (!url) return '';
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1].replace(/\..*$/, '') : '';
}

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const post = posts.find(
    p => getSlugFromUrl(p.url || '') === slug
  );
  const postUrl = `https://lastingimpression.pages.dev/${slug}`;

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h3" color="error">404 - Post Not Found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.images && post.images.length > 0 ? post.images[0] : undefined}
        url={postUrl}
      />
      <PDFExportButton contentId="post-content" filename={`${post.title || 'post'}.pdf`} />
      <div id="post-content">
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          {post.title}
        </Typography>
        <SocialShare url={postUrl} title={post.title} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {post.date ? new Date(post.date).toLocaleDateString() : ''} | {post.author}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ my: 2 }}>
          {/* Render images */}
          {post.images && post.images.map((src, i) => (
            <img key={i} src={src} alt={post.title} style={{ maxWidth: '100%', marginBottom: 16 }} />
          ))}
          {/* Render embedded videos */}
          {post.videos && post.videos.map((src, i) => (
            <Box key={i} sx={{ my: 2 }}>
              <iframe src={src} width="100%" height="400" allowFullScreen style={{ border: 0 }} />
            </Box>
          ))}
          {/* Render HTML content */}
          <div dangerouslySetInnerHTML={{ __html: post.content_html || '' }} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Categories: {post.categories && post.categories.join(', ')}<br />
          Tags: {post.tags && post.tags.join(', ')}
        </Typography>
      </div>
    </Container>
  );
};

export default PostPage; 