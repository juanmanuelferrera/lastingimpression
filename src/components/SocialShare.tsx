import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <Tooltip title="Share on Facebook">
        <IconButton color="primary" component="a" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Twitter">
        <IconButton color="primary" component="a" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on WhatsApp">
        <IconButton color="primary" component="a" href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Telegram">
        <IconButton color="primary" component="a" href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram">
          <TelegramIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share by Email">
        <IconButton color="primary" component="a" href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by Email">
          <EmailIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShare; 