import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
  </Head>
);

export default SEO; 