import React from 'react';
import Grid from '@mui/joy/Grid';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';

const Loading: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Typography level="body-md" textAlign="center">
          Loading, please wait...
        </Typography>
      </Grid>
    </Container>
  );
};

export default Loading;