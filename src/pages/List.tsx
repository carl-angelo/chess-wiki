import React, {useState, useEffect} from 'react';
import Table from '@mui/joy/Table';
import { useGetGM } from '../services/api/useGetGM';
import { useNavigate } from 'react-router';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import debounce from 'lodash/debounce';
import Loading from '../components/Loading';

const List: React.FC = () => {
  const { data, isLoading } = useGetGM();
  const navigate = useNavigate();

  const [usernameList, userUsernameList] = useState<string[]>([]);
  const [searchUser, setSearchUser] = useState<string>('');

  const handleSearch = debounce((value: string) => {
    console.log('Searching for:', value);
    setSearchUser(value);
  }, 500);

  useEffect(() => {
    if (data?.players) {
      userUsernameList(data.players.filter((player: string) =>
        player.toLowerCase().includes(searchUser.toLowerCase())
      ));
    } else {
      userUsernameList([]);
    }
  }, [data, searchUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid xs={12}>
        <Typography level='h2' textAlign='center' sx={{ marginBottom: 2 }}>
          Grandmasters List
        </Typography>
      </Grid>
      <Grid xs={12} sx={{ marginBottom: 2 }}>
        <Input placeholder="Search Grandmaster…" variant="outlined" onChange={(event) => handleSearch(event.target.value)} />
      </Grid>
      <Grid xs={12}>
        <Sheet variant="outlined" color="neutral">
          <Table aria-label="basic table" variant='soft'>
            <thead>
              <tr>
                <th> Usernames </th>
              </tr>
            </thead>
            <tbody>
              {
                usernameList && usernameList.map((player: string) => (
                  <tr key={player}>
                    <td onClick={() => navigate(`/profile/${player}`)}>{player}</td> 
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Sheet>
      </Grid>
    </Container>
  );
};
export default List;