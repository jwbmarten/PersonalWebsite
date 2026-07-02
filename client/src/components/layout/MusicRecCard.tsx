import { JSX, useEffect, useState } from "react";
import SpotifyIcon from "../../assets/spotify_icon.png";
import YoutubeIcon from "../../assets/youtube_icon.png";
import ShuffleIcon from "../../assets/shuffle.svg"
import TextMarquee from "./TextMarquee";

type SongRec = {
    title?: string | null;
    artist?: string | null;
    album?: string | null;
    youtube_url?: string | null;
    spotify_url?: string | null;
    art_url?: string | null;
};

export default function MusicRecCard(): JSX.Element {

    const [song, setSong] = useState<SongRec | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function getSong() {
            try {
                const res = await fetch('/api/randomSong');
                if (!res.ok) {
                    throw new Error(`fetch /api/randomSong failed: ${res.status}`);
                }
                const data = await res.json();
                // eslint-disable-next-line no-console
                console.debug('randomSong payload received');
                if (cancelled) return;
                // backend may return snake_case or camelCase keys (server returns camelCase)
                const youtube = data.youtube_url ?? data.youtube ?? data.youtubeUrl ?? null;
                const spotify = data.spotify_url ?? data.spotify ?? data.spotifyUrl ?? null;
                const art = data.art_url ?? data.art ?? data.artUrl ?? null;

                setSong({
                    title: data.title ?? null,
                    artist: data.artist ?? null,
                    album: data.album ?? null,
                    youtube_url: youtube,
                    spotify_url: spotify,
                    art_url: art,
                });
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Unknown error');
            }
        }

        getSong();

        return () => {
            cancelled = true;
        };
    }, [refresh]);

    const artSrc = song?.art_url || '';

    return (
    <div className="flex w-full max-w-3xl flex-col items-center pt-1 px-6 pb-3 text-sm text-white rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
            {/* Title */}
            

            {/* Card content */}
            <div className="flex w-full items-center mt-1">
                {/* Left: artwork */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 mr-3 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center shadow-md shadow-black/40">
                    {artSrc ? (
                        // Image: keep aspect via object-cover
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={artSrc} alt={song?.title ?? 'art'} className="w-full h-full object-cover border-1 border-black/50" />
                    ) : (
                        <div className="text-xs text-gray-300 px-2 text-center">No artwork</div>
                    )}
                </div>

                {/* Right: info */}
                <div className="flex-1 flex flex-col min-w-0 pl-1">
                    <p className="font-sueEllen text-lg uppercase tracking-widest text-[#fdd262]/80 mt-1 text-center pb-1">Current Rotation</p>
                    <div className="flex items-baseline justify-items-start w-full">
                        <div className="min-w-0 w-full">
                            <TextMarquee className="text-base font-semibold leading-tight" text={song?.title ?? 'Unknown Title'} />
                            <TextMarquee className="text-sm text-gray-300" text={song?.artist ?? 'Unknown Artist'} />
                            <TextMarquee className="text-sm text-gray-300" text={song?.album ?? 'Unknown Album'} />
                        </div>
                    </div>

     <div className="mt-2 w-full pr-3">
    <div className="flex items-center justify-between gap-4 whitespace-nowrap">
        
        {/* Left side: music platform icons */}
        <div className="flex items-center gap-3 flex-shrink-0">
            {song?.spotify_url && (
                <a
                    href={song.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open on Spotify"
                    className="inline-flex items-center justify-center w-8 h-8 hover:scale-105 transition-transform"
                >
                    <img
                        src={SpotifyIcon}
                        alt="Spotify"
                        className="w-8 h-8 object-contain"
                    />
                </a>
            )}

            {song?.youtube_url && (
                <a
                    href={song.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open on YouTube"
                    className="inline-flex items-center justify-center w-8 h-8 hover:scale-105 transition-transform"
                >
                    <img
                        src={YoutubeIcon}
                        alt="YouTube"
                        className="w-8 h-8 object-contain"
                    />
                </a>
            )}
        </div>

        {/* Right side: button */}
        <button
            type="button"
            onClick={() => setRefresh((r) => r + 1)}
            className="
                flex-shrink-0
                font-sueEllen
                text-sm py-1 px-3 rounded
                bg-[#fdd262]/90 text-black font-bold
                hover:bg-[#fdd261]/90
                hover:scale-105
                active:bg-[#ce9503ff]
                transition
                shadow-sm
                shadow-black/40
                shadow-inset-sm
                shadow-inset-black/30
            "
        >
            <div className="flex gap-1 items-center">
                NEXT TRACK
                <img
                    src={ShuffleIcon}
                    alt="shuffle"
                    className="w-4 h-4"
                />
            </div>
        </button>
    </div>
</div>

                    {error && <div className="mt-2 text-xs text-red-400">Error: {error}</div>}
                </div>
            </div>

                {/* end card */}
        </div>
    );
}