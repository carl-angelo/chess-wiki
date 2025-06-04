import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetPlayer } from '../services/api/useGetPlayer';
import Grid from '@mui/joy/Grid';
import Container from '@mui/joy/Container';
import PlayerCard from '../components/PlayerCard';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import type { Player } from '../interfaces/Player';

const Profile: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetPlayer({ playerId: id, enabled: !!id });

  const navigate = useNavigate();

  const [timeSinceLastOnline, setTimeSinceLastOnline] = React.useState('--');

  const getTimeSinceLastOnline = React.useCallback((lastOnline?: number) => {
    if (!lastOnline) return '--';
    const now = Date.now() / 1000;
    let diff = Math.floor(now - lastOnline);

    const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
    diff %= 3600;
    const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
    const seconds = String(diff % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }, []);

  React.useEffect(() => {
    if (!(data as Player)?.last_online) {
      setTimeSinceLastOnline('--');
      return;
    }
    const update = () => {
      setTimeSinceLastOnline(getTimeSinceLastOnline((data as Player)?.last_online));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [data, getTimeSinceLastOnline]);

  return (
    <Container>
      <Grid container>
        <Grid xs={6}>
          <Button onClick={() => navigate('/')}> <KeyboardArrowLeftIcon /> Back</Button>
        </Grid>
        <Grid xs={6} alignItems='center' display='flex' justifyContent='flex-end'>
          <Typography>Last Online: {(data as Player)?.last_online ? timeSinceLastOnline : '--'}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 2 }}>
        <Grid xs={12} display='flex' alignItems='center' justifyContent='center'>
          <PlayerCard data={data} loading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;