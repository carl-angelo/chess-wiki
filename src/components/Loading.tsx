import React from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import ThemeWrapper from './ThemeWrapper';

const Loading: React.FC = () => {
  return (
    <ThemeWrapper>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Typography level="body-md" textAlign="center">
          Loading, please wait...
        </Typography>
      </Grid>
    </ThemeWrapper>
  );
};

export default Loading;