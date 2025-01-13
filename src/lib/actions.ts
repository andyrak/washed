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
  timeRange = "medium_term",
  limit = 24,
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

export const getAvgAgeInYears = async ({ tracks }: { tracks: Track[] }) => {
  const parseDate = (dateStr: string): Date | null => {
    const [year, month, day] = dateStr.split("-").map(Number);

    if (!year) return null; // Year is mandatory

    // Default missing values to January (month) and 1st (day)
    const parsedMonth = month || 1; // Default to January
    const parsedDay = day || 1; // Default to the 1st of the month

    const date = new Date(year, parsedMonth - 1, parsedDay); // Month is zero-based
    return isNaN(date.getTime()) ? null : date; // Check for invalid Date
  };

  let totalReleaseDateMillis = 0;
  let albumCount = 0;

  for (const track of tracks) {
    const album = track.album;
    if (album?.release_date) {
      const releaseDate = parseDate(album.release_date);
      if (releaseDate) {
        totalReleaseDateMillis += releaseDate.getTime();
        albumCount++;
      }
    }
  }

  // Guard against division by zero
  if (albumCount === 0) {
    return null; // No valid albums to calculate an average
  }

  const averageReleaseDateMillis = totalReleaseDateMillis / albumCount;
  const averageReleaseDate = new Date(averageReleaseDateMillis);

  // Guard against invalid averageReleaseDate
  if (isNaN(averageReleaseDate.getTime())) {
    return null; // Invalid average date
  }

  const today = new Date();
  const deltaInMilliseconds = today.getTime() - averageReleaseDate.getTime();
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; // Accounting for leap years
  const deltaInYears = deltaInMilliseconds / millisecondsInYear;

  return Math.floor(deltaInYears); // Always return a number, even if it's 0
};

export const getUserName = async ({ session }: { session: AuthSession }) => {
  return customGet(`https://api.spotify.com/v1/me`, session);
};
