"use client";

import { useRef, useState } from "react";
import { processFilm, src } from "@/config/media";

/**
 * The factory film, shown with a poster and a large play button. Nothing downloads
 * until the visitor presses play; native controls appear once it is playing.
 */
export default function ProcessVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    const v = video.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <video
        ref={video}
        className="aspect-video w-full"
        poster={src(processFilm.poster)}
        preload="none"
        playsInline
        muted
        controls={started}
        onEnded={() => setStarted(false)}
      >
        <source src={processFilm.mp4} type="video/mp4" />
        Your browser can&rsquo;t play this video.{" "}
        <a href={processFilm.mp4}>Download the process film</a>.
      </video>

      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label="Play the factory process film"
          className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-black/55 via-black/10 to-transparent"
        >
          <span className="relative grid size-20 place-items-center rounded-full bg-leaf text-pine shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-cine group-hover:scale-110 md:size-24">
            <span aria-hidden className="absolute inset-0 rounded-full bg-leaf/60 motion-safe:animate-[pulse-ring_2.4s_ease-out_infinite]" />
            <svg viewBox="0 0 24 24" className="relative ml-1 size-8 md:size-9" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-5 rounded-md bg-black/50 px-3 py-1.5 text-sm font-semibold text-white md:bottom-7 md:left-7">
            Factory process · 0:25
          </span>
        </button>
      )}
    </div>
  );
}
