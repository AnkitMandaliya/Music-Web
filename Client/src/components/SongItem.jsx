import { useEffect, useRef } from "react";
import { Button } from "./input";

// Convert YouTube link to embed URL
function convertToEmbedURL(url) {
  if (!url) return null;
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

// Global media controller
let currentMedia = null;

export function SongItem({ song, onDelete }) {
  const audioRef = useRef(null);
  const iframeRef = useRef(null);
  const embedUrl = convertToEmbedURL(song.url);

  const audioUrl = song.filePath
    ? `http://localhost:5000/${song.filePath}`
    : song.url;

  // MP3 audio pause logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      if (currentMedia && currentMedia !== audio) {
        if (currentMedia.tagName === "AUDIO") {
          currentMedia.pause();
        } else if (currentMedia.tagName === "IFRAME") {
          currentMedia.contentWindow?.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        }
      }
      currentMedia = audio;
    };

    audio.addEventListener("play", handlePlay);
    return () => audio.removeEventListener("play", handlePlay);
  }, []);

  // YouTube player pause others on load
  const handleYouTubeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (currentMedia && currentMedia !== iframe) {
      if (currentMedia.tagName === "AUDIO") {
        currentMedia.pause();
      } else if (currentMedia.tagName === "IFRAME") {
        currentMedia.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }

    currentMedia = iframe;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Song Info */}
      <div className="flex flex-wrap items-center gap-4 bg-white border border-purple-300 rounded-xl shadow-md p-4">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-700 break-words">
            {song.title}
          </h2>
          <p className="text-sm sm:text-base italic text-blue-500 break-words">
            {song.artist}
          </p>
        </div>
        <div className="flex gap-2">
          {audioUrl && (
            <a
              href={audioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:scale-110 transition"
              title="Open"
            >
              🎧
            </a>
          )}
          <Button
            text="❌"
            onClick={() => {
              onDelete(song._id);
              alert(`Deleted "${song.title}"`);
            }}
          />
        </div>
      </div>

      {/* Media Player */}
      {embedUrl ? (
        <iframe
          ref={iframeRef}
          src={`${embedUrl}?enablejsapi=1`}
          title="YouTube player"
          className="w-full h-[200px] rounded-md shadow-md"
          allow="autoplay; encrypted-media"
          onLoad={handleYouTubeLoad}
          allowFullScreen
        ></iframe>
      ) : (
        <audio
          controls
          ref={audioRef}
          className="w-full rounded shadow-md"
          src={audioUrl}
          preload="metadata"
        />
      )}
    </div>
  );
}
