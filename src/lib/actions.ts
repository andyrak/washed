import { AuthSession, Track } from "@/types/types";
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

export const getAvgAgeInYears = async ({ tracks } : { tracks: Track[] }) => {
  const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  // Sum of all release dates in milliseconds
  let totalReleaseDateMillis = 0;
  let albumCount = 0;

  // Iterate through all tracks
  for (const track of tracks) {
    const album = track.album;
    if (album && album.release_date) {
      const releaseDate = parseDate(album.release_date);
      totalReleaseDateMillis += releaseDate.getTime();
      albumCount++;
    }
  }
  // Calculate the average release date in milliseconds
  const averageReleaseDateMillis = totalReleaseDateMillis / albumCount;

  // Convert back to Date object
  const averageReleaseDate = new Date(averageReleaseDateMillis);

  // Calculate the delta in years from today
  const today = new Date();
  const deltaInMilliseconds = today.getTime() - averageReleaseDate.getTime();
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; // Accounting for leap years
  const deltaInYears = deltaInMilliseconds / millisecondsInYear;

  return Math.floor(deltaInYears);
};

export const getUserName = async ({ session }: { session: AuthSession }) => {
  return customGet(`https://api.spotify.com/v1/me`, session);
};
