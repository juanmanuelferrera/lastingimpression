import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const NavBar = () => (
  <AppBar position="static" color="default" elevation={1}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        <Button component={Link} href="/" color="inherit" sx={{ textTransform: 'none', fontWeight: 700 }}>
          Lasting Impression
        </Button>
      </Typography>
      <Button component={Link} href="/categories" color="inherit">Categories</Button>
      <Button component={Link} href="/tags" color="inherit">Tags</Button>
      <Button component={Link} href="/media" color="inherit">Media</Button>
      <Button component={Link} href="/search" color="inherit">Search</Button>
      <Button component={Link} href="/sitemap" color="inherit">Sitemap</Button>
      <Button component={Link} href="/about" color="inherit">About</Button>
      <Box sx={{ ml: 2 }}>
        <LanguageSwitcher />
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar; 