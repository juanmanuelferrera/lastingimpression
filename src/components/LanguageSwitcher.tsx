import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useLanguage } from './LanguageContext';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <Select
      value={language}
      onChange={e => setLanguage(e.target.value)}
      size="small"
      sx={{ minWidth: 120 }}
    >
      {languages.map(l => (
        <MenuItem key={l.code} value={l.code}>{l.label}</MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher; 