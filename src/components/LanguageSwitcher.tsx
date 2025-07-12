import React from 'react';
import { MenuItem, Select } from '@mui/material';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

const LanguageSwitcher = () => {
  const [lang, setLang] = React.useState('en');
  // TODO: Integrate with i18n routing
  return (
    <Select
      value={lang}
      onChange={e => setLang(e.target.value)}
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