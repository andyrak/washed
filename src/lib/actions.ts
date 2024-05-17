import { AuthSession } from "@/types/types";
import { customGet } from "@/utils/serverUtils";

export const getRecentlyPlayedTracks = async (
    session: AuthSession,
    limit = 50
  ) => {
    return customGet(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
      session
    );
  };
  
  export const getTopItems = async ({
    session,
    timeRange = "short_term",
    limit = 50,
    type,
  }: {
    session: AuthSession;
    timeRange?: string;
    limit?: number;
    type: "artists" | "tracks";
  }) => {
    return customGet(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
      session
    );
  };