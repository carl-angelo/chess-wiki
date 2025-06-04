import { useQuery } from "@tanstack/react-query";
import api from '../index';

interface GetGMProps {
  enabled?: boolean;
}
export const useGetGM = ({ enabled }: GetGMProps = { enabled: true }) => {
  return useQuery({
    queryKey: ['getGM'],
    queryFn: async () => {
      const response = await api.get('/titled/GM');
      return response.data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
};