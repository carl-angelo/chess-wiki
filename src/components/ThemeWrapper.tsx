import React from 'react';
import IconButton from '@mui/joy/IconButton';
import { useColorScheme, useTheme } from '@mui/joy/styles';
import Container from '@mui/joy/Container';
import { GlobalStyles, Stack } from '@mui/material';
import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {

  const { setMode, mode } = useColorScheme();
  const theme = useTheme();

  return (
    <Container>
      <GlobalStyles styles={{ body: { backgroundColor: theme.vars.palette.background.body } }} />
      <Stack sx={{
        position: 'absolute',
        zIndex: 100,
        right: '8px',
      }}>
        <IconButton variant='outlined' onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'light' ? <SunnyIcon /> : <BedtimeIcon />}
        </IconButton>
      </Stack>
      {children}
    </Container>
  );
};

export default ThemeWrapper;