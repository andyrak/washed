import { getAvgAgeInYears, getTopItems, getUserName } from "@/lib/actions";
import { Track } from "@/types/types";
import { Album } from "lucide-react";
import { getGreeting, getIsWashed, getWashedPhrase } from "@/utils/clientUtils";
import { getAuthSession } from "@/utils/serverUtils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Are you washed?",
};

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const allTimeTopTracks = (await getTopItems({
    session,
    limit: 24,
    timeRange: "medium_term",
    type: "tracks",
  }).then((data) => data.items)) as Track[];

  const username = (await getUserName({ session }).then(
    (data) => data.display_name
  )) as string;

  const yearDelta = (await getAvgAgeInYears({ tracks: allTimeTopTracks }).then(
    (data) => data
  )) as number;

  const isWashed = getIsWashed(yearDelta);

  return (
    <section className="flex flex-col items-start">
      <h1 className="mb-2 text-3xl font-bold">
        Good {getGreeting()}, {username}
      </h1>

      <h2 className="mt-6 text-2xl">
        {getWashedPhrase(yearDelta)}{" "}
        <span className={`${isWashed ? "wavy" : ""}`}>w</span>
        <span className={`${isWashed ? "wavy2" : ""}`}>a</span>
        <span className={`${isWashed ? "wavy3" : ""}`}>s</span>
        <span className={`${isWashed ? "wavy4" : ""}`}>h</span>
        <span className={`${isWashed ? "wavy5" : ""}`}>e</span>
        <span className={`${isWashed ? "wavy6" : ""}`}>d</span>
        <span className={`${isWashed ? "wavy7" : ""}`}>.</span>
      </h2>

      <h3 className="mt-6">
        Your top 24 tracks over the last 6 months released an average of{" "}
        {yearDelta} years ago.
      </h3>

      <div className="mt-6 grid w-full grid-cols-12 gap-4">
        {allTimeTopTracks.map((track) => (
          <Link
            href={`${track.external_urls['spotify']}`}
            key={track.id}
            rel="noopener noreferrer" 
            target="_blank"
            className="flex items-center justify-between col-span-4 pr-4 truncate rounded-md group/item bg-paper-600 hover:bg-paper-400"
          >
            <div className="flex items-center gap-4">
              {track.album.images.length > 0 ? (
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={72}
                  height={72}
                  className="object-cover h-full rounded-tl-md rounded-bl-md aspect-square"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              ) : (
                <Album size={20} />
              )}
              <div className="flex flex-col">
                <h3 className="font-semibold truncate">{track.name}</h3>
                <h3 className="truncate">{track.album.artists[0]?.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
