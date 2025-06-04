import React from 'react';
import Alert from '@mui/joy/Alert';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Person from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import Stack from '@mui/joy/Stack';
import Skeleton from '@mui/joy/Skeleton';
import type { Player } from '../interfaces/Player';
import type { ApiError } from '../interfaces/ApiError';


interface PlayerCardProps {
  data?: Player | ApiError;
  loading?: boolean;
}
const PlayerCard: React.FC<PlayerCardProps> = ({ data, loading }) => {


  const getAvatar = (url: string | undefined) => {
    if (!url) {
      return (
        <Stack sx={(theme) => ({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 200, backgroundColor: theme.vars.palette.background.level1 })}>
          <Person sx={{ width: 64, height: 64 }} />
        </Stack>
      );
    }

    return (
      <img
        src={url}
        loading="lazy"
        alt="Image of the player"
      />
    )
  };

  if (data && 'code' in data) {
    return (
      <Alert sx={{ paddingLeft: 8, paddingRight: 8 }} color="warning">
        <h1>Error: {data.message}</h1>
      </Alert>
    );
  }

  return (
    <Card sx={{ width: 320 }}>
      {getAvatar(data?.avatar)}
      <CardContent orientation="vertical">
        <Typography sx={{ display: 'flex', gap: 1, alignItems: 'center' }} level="title-lg">
            Username: <Skeleton loading={!data?.username} sx={{ width: 200, height: 24 }}> {data?.username}</Skeleton>
            {
              data?.verified && <VerifiedIcon sx={{ color: 'green', width: 20, height: 20 }} />
            }
          
        </Typography>
        <Typography level="body-sm">
          <Skeleton loading={loading} sx={{ width: 200, height: 21 }}>
            Name: {data?.name ?? '--'}
          </Skeleton>
        </Typography>
        <Typography level="body-sm">
          Joined:
          <Skeleton loading={loading} sx={{ width: 100, height: 21 }}>
            {data && data.joined ? new Date(data.joined).toLocaleDateString() : '--'}
          </Skeleton>
        </Typography>
        <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
          <Chip>{data?.followers ?? '0'} followers</Chip>
          <Chip sx={{ textTransform: 'capitalize' }}>{data?.status}</Chip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;