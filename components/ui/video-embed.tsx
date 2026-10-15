type VideoEmbedProps = {
  title: string;
  /** Self-hosted MP4 in /public (used until the video is on YouTube). */
  src: string;
  poster: string;
  captions?: string;
  /** Set this once the video is uploaded to YouTube; the embed then switches automatically. */
  youtubeId?: string;
  className?: string;
};

// Responsive 16:9 player. Uses YouTube (privacy-enhanced) when youtubeId is set, otherwise the local MP4.
export default function VideoEmbed({
  title,
  src,
  poster,
  captions,
  youtubeId,
  className = '',
}: VideoEmbedProps) {
  return (
    <figure
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-white/20 bg-absolute-black shadow-[0_16px_48px_rgba(0,0,0,0.25)] ${className}`}
    >
      {youtubeId ? (
        <iframe
          className='absolute inset-0 h-full w-full'
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&cc_load_policy=1`}
          title={title}
          loading='lazy'
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      ) : (
        <video
          className='absolute inset-0 h-full w-full object-cover'
          controls
          playsInline
          preload='metadata'
          poster={poster}
          aria-label={title}
        >
          <source src={src} type='video/mp4' />
          {captions ? (
            <track kind='captions' src={captions} srcLang='en' label='English' default />
          ) : null}
        </video>
      )}
      <figcaption className='sr-only'>{title}</figcaption>
    </figure>
  );
}
