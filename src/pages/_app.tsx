import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { LanguageProvider } from '../components/LanguageContext';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    background: {
      default: '#f9f9f9',
    },
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <NavBar />
        <Component {...pageProps} />
        <BackToTop />
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
} 