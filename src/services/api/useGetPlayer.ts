import { useQuery } from "@tanstack/react-query";
import api from '../index';
import type { Player } from "../../interfaces/Player";
import type { ApiError } from "../../interfaces/ApiError";

interface GetPlayerProps {
  playerId?: string;
  enabled?: boolean;
}
export const useGetPlayer = ({ playerId, enabled }: GetPlayerProps = { enabled: true }) => {
  return useQuery({
    queryKey: ['getGM'],
    queryFn: async () => {
      try {
        const response = await api.get(`/player/${playerId}`);
        return response.data as Player;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.response?.data as ApiError;
      }
    },
    enabled,
    refetchOnWindowFocus: false,
  });
};