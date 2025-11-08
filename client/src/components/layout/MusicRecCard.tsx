import { JSX, useEffect, useState } from "react";
import SpotifyIcon from "../../assets/spotify_icon.png";
import YoutubeIcon from "../../assets/youtube_icon.png";
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
    <div className="flex w-full max-w-3xl items-center m-6 p-3 text-sm text-white rounded-xl backdrop-blur-sm shadow-lg ring-2 ring-gray-900 bg-white/5">
            {/* Left: artwork */}
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 mr-3 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                {artSrc ? (
                    // Image: keep aspect via object-cover
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={artSrc} alt={song?.title ?? 'art'} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-xs text-gray-300 px-2 text-center">No artwork</div>
                )}
            </div>

            {/* Right: info */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-baseline justify-items-start w-full">
                    <div className="min-w-0 w-full">
                        <TextMarquee className="text-base font-semibold leading-tight" text={song?.title ?? 'Unknown Title'} />
                        <TextMarquee className="text-sm text-gray-300" text={song?.artist ?? 'Unknown Artist'} />
                        <TextMarquee className="text-sm text-gray-300" text={song?.album ?? 'Unknown Album'} />
                    </div>
                </div>

                                <div className="mt-2">
                                    <div className="flex items-center gap-3 whitespace-nowrap">
                                                {song?.spotify_url && (
                                                        <a
                                                            href={song.spotify_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label="Open on Spotify"
                                                            className="inline-flex items-center justify-center w-8 h-8 hover:scale-105 transition-transform"
                                                        >
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={SpotifyIcon} alt="Spotify" className="w-8 h-8 object-contain" />
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
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={YoutubeIcon} alt="YouTube" className="w-8 h-8 object-contain" />
                                                        </a>
                                                )}
                                        <button
                                            type="button"
                                            onClick={() => setRefresh((r) => r + 1)}
                                            className="text-xs py-1 px-3 w-auto rounded bg-[#fdd262] text-black font-bold hover:bg-[#fdd262]/90 transition"
                                        >
                                            Next rec
                                        </button>
                                    </div>
                                </div>

                {error && <div className="mt-2 text-xs text-red-400">Error: {error}</div>}
            </div>

                {/* end card */}
        </div>
    );
}