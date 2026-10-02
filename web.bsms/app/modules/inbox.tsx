import type { Route } from "./+types/inbox";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  UserPlus,
  ListFilter,
  SlidersHorizontal,
  Inbox as InboxIcon,
  Ellipsis,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  PictureInPicture2,
  Maximize,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import introVideo from "@/assets/videos/20260925-1759-20.9436815.mp4";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inbox - Dashboard" },
    { name: "description", content: "Notifications and updates." },
  ];
}

type Notification = {
  id: string;
  title: string;
  preview: string;
  time: string;
  iconBg: string;
  icon: React.ReactNode;
  videoUrl?: string;
};

const notifications: Notification[] = [
  {
    id: "welcome",
    title: "Welcome to Linear",
    preview: "Watch an introductory video and access a list of resources below.",
    time: "3mo",
    iconBg: "bg-neutral-100",
    icon: (
      <svg viewBox="0 0 100 100" className="h-4 w-4" fill="none">
        <path
          d="M10 55 L90 15 M10 70 L90 30 M10 85 L90 45"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    ),
    videoUrl: introVideo,
  },
];

// ---------- Resizable divider ----------
function useResizablePane(initial: number, min: number, max: number) {
  const [width, setWidth] = useState(initial);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      setWidth(Math.min(max, Math.max(min, e.clientX)));
    }
    function onMouseUp() {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [min, max]);

  return { width, onMouseDown };
}

// ---------- Video player ----------
function VideoPlayer({ src, poster }: { src: string; poster?: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const cycleRate = () => {
    const rates = [1, 1.25, 1.5, 2, 0.5, 0.75];
    const next = rates[(rates.indexOf(rate) + 1) % rates.length];
    if (videoRef.current) videoRef.current.playbackRate = next;
    setRate(next);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
    setCurrent(v.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg"
    >
      <video
        ref={videoRef}
        src={src}
        className="aspect-video w-full bg-white"
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/80 text-white transition-transform hover:scale-105">
            <Play className="h-6 w-6 fill-white" />
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-white">
        <button onClick={togglePlay} className="rounded p-1 hover:bg-white/10">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button onClick={toggleMute} className="rounded p-1 hover:bg-white/10">
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <span className="text-xs tabular-nums text-white/90">{fmt(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={seek}
          className="h-1 flex-1 cursor-pointer accent-white"
        />
        <span className="text-xs tabular-nums text-white/90">{fmt(duration)}</span>
        <button
          onClick={cycleRate}
          className="rounded px-1.5 py-0.5 text-xs font-medium hover:bg-white/10"
        >
          {rate}x
        </button>
        <a
          href={src}
          download
          className="rounded p-1 hover:bg-white/10"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </a>
        <button
          onClick={() => (videoRef.current as any)?.requestPictureInPicture?.()}
          className="rounded p-1 hover:bg-white/10"
          title="Picture in picture"
        >
          <PictureInPicture2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => containerRef.current?.requestFullscreen?.()}
          className="rounded p-1 hover:bg-white/10"
          title="Fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>("welcome");
  const { width, onMouseDown } = useResizablePane(320, 240, 560);

  const selected = notifications.find((n) => n.id === selectedId) ?? null;

  return (
    <DashboardShell>
      <div className="flex h-full w-full">
        {/* List pane */}
        <div
          style={{ width }}
          className="flex shrink-0 flex-col border-r border-border"
        >
          <header className="flex h-11 items-center justify-between px-4">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-medium">Inbox</span>
              <button className="rounded p-1.5">
                <Ellipsis className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-neutral-400">
              <button className="rounded p-1.5 hover:bg-neutral-800 hover:text-neutral-200">
                <UserPlus className="h-4 w-4" />
              </button>
              <button className="rounded p-1.5 hover:bg-neutral-800 hover:text-neutral-200">
                <ListFilter className="h-4 w-4" />
              </button>
              <button className="rounded p-1.5 hover:bg-neutral-800 hover:text-neutral-200">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </header>

          <Separator className="bg-neutral-800" />

          <ul className="flex-1 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setSelectedId(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors",
                    selectedId === n.id && "bg-blue-900"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      n.iconBg
                    )}
                  >
                    {n.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-neutral-100">
                      {n.title}
                    </span>
                    <span className="block truncate text-[13px] text-neutral-400">
                      {n.preview}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12px] text-neutral-500">{n.time}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          className="w-px shrink-0 cursor-col-resize"
        />

        {/* Detail pane */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-10">
          {selected ? (
            <div className="w-full max-w-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                {selected.icon}
              </div>
              <h2 className="mb-3 text-3xl font-semibold">
                {selected.title}
              </h2>
              <p className="mb-4 inline-block rounded bg-neutral-800 px-2 py-1 text-sm text-neutral-200">
                {selected.preview}
              </p>
              {selected.videoUrl && <VideoPlayer src={selected.videoUrl} />}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <InboxIcon className="h-14 w-14 stroke-[1.25] text-neutral-600" />
              <p className="text-[15px] font-medium text-neutral-200">
                No notification selected
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}