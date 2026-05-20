import { JSX, useEffect, useState } from "react";
import TextMarquee from "./TextMarquee";
import ImdbIcon from "../../assets/imdb_icon.png";
import LetterboxdIcon from "../../assets/letterboxd_icon.png";

type MovieRec = {
  title?: string | null;
  director?: string | null;
  release_year?: number | null;
  imdb_url?: string | null;
  letterboxd_url?: string | null;
  art_url?: string | null;
  tagline?: string | null;
  blurb?: string | null;
  genres?: string[] | null;
};

export default function MovieRecCard(): JSX.Element {
  const [movie, setMovie] = useState<MovieRec | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchMovie() {
      try {
        const res = await fetch("/api/randomMovie");
        if (!res.ok) throw new Error(`/api/randomMovie -> ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        // normalize keys (handle snake/camel just in case)
        setMovie({
        title: data.title ?? null,
        director: data.director ?? null,
        release_year: data.release_year ?? data.releaseYear ?? null,
        imdb_url: data.imdb_url ?? data.imdbUrl ?? null,
        letterboxd_url: data.letterboxd_url ?? data.letterboxdUrl ?? null,
        art_url: data.art_url ?? data.artUrl ?? null,
        tagline: data.tagline ?? null,
        blurb: data.blurb ?? null,      // ← NEW
        genres: data.genres ?? null,
      });

      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error");
      }
    }
    fetchMovie();
    return () => { cancelled = true };
  }, [refresh]);

  const artSrc = movie?.art_url || "";
  const titleWithYear = movie?.title ? `${movie.title}${movie?.release_year ? ` (${movie.release_year})` : ""}` : "Unknown Title";

  const genres = (movie?.genres ?? []).filter(Boolean).slice(0, 2) as string[];

  return (
    <div className="flex w-full max-w-3xl flex-col m-6 p-3 text-sm text-white rounded-xl backdrop-blur-sm shadow-lg ring-2 ring-gray-900 bg-white/5">
      {/* Title at the top */}
      <TextMarquee className="text-lg font-semibold leading-tight text-center" text={titleWithYear} />

      {/* Content row: art larger + details */}
      <div className="mt-2 flex items-center gap-4">
        {/* Artwork: taller rectangle, takes more horizontal space */}
        <div
  className="
    flex-[0_0_46%]      /* default (mobile) */
    md:flex-[0_0_30%]   /* narrower on md+ */
    h-40 sm:h-52
    rounded-md overflow-hidden
    flex items-center justify-center
  "
>
          {artSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
              <img src={artSrc} alt={movie?.title ?? "poster"} className="h-full w-auto max-w-full object-cover" />
          ) : (
            <div className="text-xs text-gray-300 px-2 text-center">No artwork</div>
          )}
        </div>

{/* Right details */}
<div className="flex-1 min-w-0 flex flex-col justify-between items-center py-1">
  {/* Top meta */}
  <div className="flex flex-col items-center text-center max-w-xs">
    <TextMarquee
      className="text-sm text-gray-300"
      text={movie?.director ? movie.director : "Unknown Director"}
    />

    {/* first two genres as chips */}
    {genres.length > 0 && (
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        {genres.map((g) => (
          <span
            key={g}
            className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15"
          >
            {g}
          </span>
        ))}
      </div>
    )}

    {/* Tagline (md+ only) */}
    {movie?.tagline && (
      <p className="mt-2 hidden md:block italic text-xs text-gray-200">
        {movie.tagline}
      </p>
    )}

    {/* Blurb (md+ only) */}
    {movie?.blurb && (
      <p className="mt-2 hidden md:block text-xs text-gray-200 leading-snug">
        {movie.blurb}
      </p>
    )}
  </div>

{/* Bottom actions */}
<div className="mt-3 flex flex-col items-center gap-2">
  {/* Icons row + button: column on small, row on md+ */}
  <div className="flex flex-col items-center gap-3 md:flex-row">
    {/* Icons row: always side by side */}
    <div className="flex items-center gap-3">
      {movie?.imdb_url && (
        <a
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open on IMDb"
          className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 hover:scale-105 transition-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ImdbIcon}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            alt="IMDb"
          />
        </a>
      )}
      {movie?.letterboxd_url && (
        <a
          href={movie.letterboxd_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open on Letterboxd"
          className="inline-flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 hover:scale-105 transition-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LetterboxdIcon}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            alt="Letterboxd"
          />
        </a>
      )}
    </div>

    {/* Next button: below on small, inline on md+ */}
    <button
      type="button"
      onClick={() => setRefresh((r) => r + 1)}
      className="text-xs py-1.5 px-3 rounded bg-[#fdd262] text-black font-bold hover:bg-[#fdd262]/90 transition"
    >
      Next movie
    </button>
  </div>

  {error && (
    <div className="mt-1 text-xs text-red-400">
      Error: {error}
    </div>
  )}
</div>

</div>




      </div>
    </div>
  );
}
