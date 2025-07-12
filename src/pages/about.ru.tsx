import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPageRU = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
      О Ханумане дасе
    </Typography>
    <Typography variant="body1" sx={{ my: 3 }}>
      Хануман дас (Хрвойе Марьянович) был страстным и откровенным голосом в сообществе сознания Кришны. Через свой блог, видео и статьи он исследовал философию, культуру и духовную жизнь с честностью и смелостью. Этот архив сохраняет его работы для будущих поколений, отдавая дань его памяти и вкладу.
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
      Все материалы © Хануман дас (Хрвойе Марьянович). Сохраняется в образовательных и архивных целях.
    </Typography>
  </Container>
);

export default AboutPageRU; 