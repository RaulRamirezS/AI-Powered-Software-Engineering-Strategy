import { CheckCircle2, Headset, Gauge, BarChart3, Bot, Route, Boxes } from 'lucide-react';
import content from '@/content/customer-care-technical-support.json';
import AnimatedSequence from '@/components/ui/animated-sequence';
import VideoEmbed from '@/components/ui/video-embed';

const ICONS = [Headset, Gauge, BarChart3, Bot, Route];

export default function WorkstreamsSection() {
  const c = content.workstreams;
  const v = content.videos.main;

  return (
    <section id='workstreams' className='scroll-mt-20 bg-black py-20 md:py-28'>
      <div className='mx-auto max-w-[1280px] px-6'>
        <div className='mb-14 grid items-center gap-10 md:mb-20 lg:grid-cols-[1fr_1.15fr] lg:gap-14'>
          <div>
            <p className='text-overline mb-4 font-public font-semibold text-secondary'>
              {c.overline}
            </p>
            <h2 className='text-title-h4 text-balance mb-5 max-w-4xl font-anybody text-white'>
              {c.title}
            </h2>
            <p className='max-w-3xl font-public text-body-line leading-relaxed text-white/60'>
              {c.intro}
            </p>
          </div>
          <VideoEmbed
            title={v.title}
            src={v.src}
            poster={v.poster}
            captions={v.captions}
            youtubeId={v.youtubeId || undefined}
          />
        </div>

        <AnimatedSequence
          animation='fadeInUp'
          staggerDuration={0.1}
          className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
        >
          {c.items.map((item, i) => {
            const Icon = ICONS[i] ?? Boxes;
            return (
              <article
                key={item.title}
                className='group relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]'
              >
                <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-absolute-black'>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </div>
                <h3 className='mb-3 font-anybody text-lg font-bold text-white'>{item.title}</h3>
                <p className='mb-5 font-public text-body-line text-white/60'>{item.text}</p>
                <p className='mt-auto flex items-start gap-2 border-t border-white/10 pt-4 font-public text-sm text-white'>
                  <CheckCircle2
                    className='mt-0.5 h-4 w-4 shrink-0 text-secondary'
                    aria-hidden='true'
                  />
                  <span>
                    <span className='font-semibold'>Outcome:</span> {item.outcome}
                  </span>
                </p>
              </article>
            );
          })}

          {/* Teaser card linking to the human + AI model */}
          <a
            href='#human-ai'
            className='group relative flex h-full flex-col rounded-2xl border border-secondary/40 bg-secondary/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1'
          >
            <span className='text-[10px] font-semibold uppercase tracking-[0.08em] text-secondary'>
              {content.model.overline}
            </span>
            <h3 className='mb-3 mt-2 font-anybody text-lg font-bold text-secondary'>
              {content.model.title}
            </h3>
            <p className='font-public text-body-line text-white/70'>{content.answer.improve.text}</p>
            <span className='ti-button mt-auto pt-5 text-white'>{content.answer.improve.cta} →</span>
          </a>
        </AnimatedSequence>
      </div>
    </section>
  );
}
