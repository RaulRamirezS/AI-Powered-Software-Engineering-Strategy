'use client';

import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { CheckCircle2, Pause, Play } from 'lucide-react';
import { useRef, useState, type AnimationEvent } from 'react';

const GOLD = '#FDBE00';
const INDIGO = '#5E63FC';
const SCENE_SECONDS = 6.5;

type Step = { id: string; title: string; text: string; outcome: string };

type EngagementPlayerProps = {
  steps: Step[];
  outcomeLabel: string;
  label: string;
  stepLabel: string;
  pauseLabel: string;
  playLabel: string;
};

/* ---------------------------------- Scenes ---------------------------------- */
/* All scenes draw inside a 640x400 SVG. Content stays above y=300 so the caption fits below. */

const NODES = [
  { label: 'Patient app', x: 90, y: 90 },
  { label: 'EHR', x: 230, y: 60 },
  { label: 'Labs', x: 370, y: 105 },
  { label: 'Claims', x: 520, y: 65 },
  { label: 'Documents', x: 150, y: 215 },
  { label: 'Data', x: 320, y: 235 },
  { label: 'Portal', x: 500, y: 205 },
];
const EDGES = [
  [0, 1],
  [0, 4],
  [1, 2],
  [1, 5],
  [2, 3],
  [2, 5],
  [3, 6],
  [4, 5],
  [5, 6],
  [0, 2],
  [1, 4],
  [2, 6],
];

function ChipText({ x, y, text, color, delay }: { x: number; y: number; text: string; color: string; delay: number }) {
  const w = text.length * 7.2 + 28;
  return (
    <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <rect
        x={x - w / 2}
        y={y - 14}
        width={w}
        height={28}
        rx={14}
        fill={`${color}22`}
        stroke={color}
        strokeOpacity={0.7}
      />
      <circle cx={x - w / 2 + 14} cy={y} r={3.5} fill={color} />
      <text x={x + 6} y={y + 4} textAnchor='middle' fontSize={12} fill='#FAF8F9' className='font-public'>
        {text}
      </text>
    </motion.g>
  );
}

function SceneAssess() {
  const scanDuration = 3.2;
  const scanStart = 0.5;
  return (
    <g>
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={INDIGO}
          strokeOpacity={0.45}
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
        />
      ))}
      {NODES.map((n, i) => {
        const hit = scanStart + (n.x / 640) * scanDuration;
        return (
          <g key={n.label}>
            <motion.rect
              x={n.x - 42}
              y={n.y - 15}
              width={84}
              height={30}
              rx={9}
              initial={{ stroke: '#55505a', fill: '#17151a' }}
              animate={{ stroke: GOLD, fill: '#2a2208' }}
              transition={{ delay: hit, duration: 0.3 }}
            />
            <motion.text
              x={n.x}
              y={n.y + 4}
              textAnchor='middle'
              fontSize={13}
              className='font-public'
              initial={{ fill: '#9C9299' }}
              animate={{ fill: '#FAF8F9' }}
              transition={{ delay: hit, duration: 0.3 }}
            >
              {n.label}
            </motion.text>
            <motion.circle
              cx={n.x + 42}
              cy={n.y - 15}
              r={4}
              fill={GOLD}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 1], opacity: 1 }}
              transition={{ delay: hit + 0.05 * i, duration: 0.5 }}
            />
          </g>
        );
      })}
      {/* Scan line */}
      <motion.rect
        y={20}
        width={3}
        height={265}
        rx={1.5}
        fill={GOLD}
        style={{ filter: 'drop-shadow(0 0 8px rgba(253,190,0,0.9))' }}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 640, opacity: [0, 1, 1, 0] }}
        transition={{ delay: scanStart, duration: scanDuration, ease: 'linear', times: [0, 0.05, 0.95, 1] }}
      />
      <ChipText x={150} y={272} text='Modernize' color={GOLD} delay={4} />
      <ChipText x={320} y={272} text='Integrate' color={INDIGO} delay={4.4} />
      <ChipText x={490} y={272} text='Leave alone' color='#9C9299' delay={4.8} />
    </g>
  );
}

const ROADMAP = [
  { label: 'EHR integration', w: 310 },
  { label: 'Claims automation', w: 255 },
  { label: 'Patient portal', w: 205 },
  { label: 'Registry RPA', w: 150 },
  { label: 'HIPAA test suite', w: 100 },
];
const SHUFFLE = [3, 0, 4, 1, 2];

function SceneRoadmap() {
  const rowY = (i: number) => 62 + i * 44;
  return (
    <g>
      <text x={36} y={32} fontSize={11} fill='#9C9299' className='font-public' letterSpacing={1.2}>
        BUSINESS IMPACT, RISK AND EFFORT
      </text>
      {ROADMAP.map((r, rank) => {
        const top = rank < 3;
        return (
          <motion.g
            key={r.label}
            initial={{ y: rowY(SHUFFLE[rank]) }}
            animate={{ y: rowY(rank) }}
            transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.circle
              cx={46}
              cy={0}
              r={13}
              initial={{ fill: '#17151a', stroke: '#55505a' }}
              animate={{ fill: top ? '#2a2208' : '#17151a', stroke: top ? GOLD : '#55505a' }}
              transition={{ delay: 2.4, duration: 0.4 }}
            />
            <motion.text
              x={46}
              y={4.5}
              textAnchor='middle'
              fontSize={13}
              fontWeight={700}
              fill='#FAF8F9'
              className='font-public'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              {rank + 1}
            </motion.text>
            <text x={72} y={4.5} fontSize={13} fill='#FAF8F9' className='font-public'>
              {r.label}
            </text>
            <rect x={270} y={-8} width={320} height={16} rx={8} fill='#ffffff10' />
            <motion.rect
              x={270}
              y={-8}
              height={16}
              rx={8}
              initial={{ width: 0, fill: INDIGO }}
              animate={{ width: r.w, fill: top ? GOLD : INDIGO }}
              transition={{ width: { delay: 0.2 + rank * 0.15, duration: 0.8 }, fill: { delay: 2.4, duration: 0.4 } }}
              fillOpacity={top ? 1 : 0.55}
            />
          </motion.g>
        );
      })}
      <ChipText x={200} y={276} text='Success metrics agreed' color={GOLD} delay={3.4} />
      <ChipText x={430} y={276} text='Leadership approves' color={INDIGO} delay={3.9} />
    </g>
  );
}

function SceneTeam() {
  const hub = { x: 320, y: 145 };
  const members = [
    { label: 'Healthcare', tag: 'HC', x: 130, y: 110, color: GOLD },
    { label: 'Engineering', tag: 'ENG', x: 510, y: 110, color: INDIGO },
    { label: 'QA', tag: 'QA', x: 320, y: 232, color: '#FAF8F9' },
  ];
  return (
    <g>
      {members.map((m, i) => (
        <motion.line
          key={m.label}
          x1={hub.x}
          y1={hub.y}
          x2={m.x}
          y2={m.y}
          stroke={m.color}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          strokeDasharray='5 7'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8 + i * 0.35, duration: 0.6 }}
        />
      ))}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
      >
        <circle cx={hub.x} cy={hub.y} r={42} fill={`${GOLD}14`} stroke={GOLD} strokeOpacity={0.6} />
        <text
          x={hub.x}
          y={hub.y - 2}
          textAnchor='middle'
          fontSize={13}
          fontWeight={700}
          fill={GOLD}
          className='font-anybody'
        >
          One
        </text>
        <text
          x={hub.x}
          y={hub.y + 15}
          textAnchor='middle'
          fontSize={13}
          fontWeight={700}
          fill={GOLD}
          className='font-anybody'
        >
          team
        </text>
      </motion.g>
      {members.map((m, i) => (
        <motion.g
          key={m.label}
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.35, duration: 0.6, type: 'spring', bounce: 0.35 }}
        >
          <circle cx={m.x} cy={m.y} r={30} fill='#17151a' stroke={m.color} strokeOpacity={0.8} strokeWidth={1.5} />
          <text
            x={m.x}
            y={m.y + 5}
            textAnchor='middle'
            fontSize={14}
            fontWeight={700}
            fill={m.color}
            className='font-anybody'
          >
            {m.tag}
          </text>
          <text x={m.x} y={m.y + 50} textAnchor='middle' fontSize={12} fill='#FAF8F9' className='font-public'>
            {m.label}
          </text>
        </motion.g>
      ))}
      <ChipText x={105} y={236} text='Your time zone' color={GOLD} delay={2.4} />
      <ChipText x={535} y={236} text='Your language' color={INDIGO} delay={2.9} />
    </g>
  );
}

function SceneBuild() {
  const boxes = [
    { label: 'Build', x: 120 },
    { label: 'Test', x: 320 },
    { label: 'Release', x: 520 },
  ];
  const loop = 3.6;
  return (
    <g>
      <line x1={120} y1={120} x2={520} y2={120} stroke='#55505a' strokeDasharray='4 6' />
      {boxes.map((b, i) => (
        <g key={b.label}>
          <motion.rect
            x={b.x - 62}
            y={92}
            width={124}
            height={56}
            rx={12}
            fill='#17151a'
            strokeWidth={1.5}
            initial={{ opacity: 0, stroke: '#55505a' }}
            animate={{ opacity: 1, stroke: ['#55505a', '#55505a', GOLD, GOLD, '#55505a', '#55505a'] }}
            transition={{
              opacity: { delay: i * 0.2, duration: 0.4 },
              stroke: {
                delay: 0.6,
                duration: loop,
                repeat: Infinity,
                times: [0, i * 0.28, i * 0.28 + 0.06, i * 0.28 + 0.3, i * 0.28 + 0.36, 1],
              },
            }}
          />
          <text
            x={b.x}
            y={125}
            textAnchor='middle'
            fontSize={15}
            fontWeight={700}
            fill='#FAF8F9'
            className='font-anybody'
          >
            {b.label}
          </text>
        </g>
      ))}
      <motion.circle
        cy={120}
        r={7}
        fill={GOLD}
        style={{ filter: 'drop-shadow(0 0 8px rgba(253,190,0,0.9))' }}
        initial={{ cx: 120, opacity: 0 }}
        animate={{ cx: [120, 320, 520], opacity: [1, 1, 1] }}
        transition={{ delay: 0.6, duration: loop * 0.8, repeat: Infinity, repeatDelay: loop * 0.2, ease: 'easeInOut' }}
      />
      {/* Release cadence */}
      <text x={36} y={188} fontSize={11} fill='#9C9299' className='font-public' letterSpacing={1.2}>
        SHORT RELEASES
      </text>
      <line x1={36} y1={214} x2={604} y2={214} stroke='#55505a' />
      {['v1.1', 'v1.2', 'v1.3', 'v1.4'].map((v, i) => (
        <motion.g
          key={v}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.7, duration: 0.4 }}
          style={{ transformOrigin: `${110 + i * 140}px 214px` }}
        >
          <circle cx={110 + i * 140} cy={214} r={9} fill='#0d2a1a' stroke='#2CA862' strokeWidth={1.5} />
          <path
            d={`M${105 + i * 140} 214 l3.5 3.5 l6 -7`}
            fill='none'
            stroke='#2CA862'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <text x={110 + i * 140} y={240} textAnchor='middle' fontSize={12} fill='#FAF8F9' className='font-public'>
            {v}
          </text>
        </motion.g>
      ))}
      <ChipText x={170} y={274} text='Regression testing' color={INDIGO} delay={4} />
      <ChipText x={400} y={274} text='Security & HIPAA review' color={GOLD} delay={4.4} />
    </g>
  );
}

const CHART: [number, number][] = [
  [60, 215],
  [140, 195],
  [220, 200],
  [300, 155],
  [380, 135],
  [460, 100],
  [580, 72],
];
const CHART_PATH = CHART.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

function SceneRun() {
  return (
    <g>
      {[60, 110, 160, 210].map((y) => (
        <line key={y} x1={60} y1={y} x2={600} y2={y} stroke='#ffffff10' />
      ))}
      <motion.path
        d={`${CHART_PATH} L580 235 L60 235 Z`}
        fill='url(#run-area)'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      />
      <defs>
        <linearGradient id='run-area' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={GOLD} stopOpacity={0.3} />
          <stop offset='100%' stopColor={GOLD} stopOpacity={0} />
        </linearGradient>
      </defs>
      <line x1={60} y1={110} x2={600} y2={110} stroke={INDIGO} strokeDasharray='6 6' strokeOpacity={0.8} />
      <text x={60} y={100} textAnchor='start' fontSize={11} fill='#A3AFFF' className='font-public' letterSpacing={1}>
        KPI TARGET (STEP 2)
      </text>
      <motion.path
        d={CHART_PATH}
        fill='none'
        stroke={GOLD}
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ filter: 'drop-shadow(0 0 6px rgba(253,190,0,0.6))' }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 2.4, ease: 'easeInOut' }}
      />
      {CHART.map(([x, y], i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={y}
          r={5}
          fill='#0d0c0d'
          stroke={GOLD}
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + (i / (CHART.length - 1)) * 2.4, duration: 0.3 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <ChipText x={170} y={270} text='Production support' color={INDIGO} delay={3.2} />
      <ChipText x={400} y={270} text='KPIs tracked' color={GOLD} delay={3.7} />
      <ChipText x={540} y={270} text='Progress reported' color='#2CA862' delay={4.2} />
    </g>
  );
}

const SCENES = [SceneAssess, SceneRoadmap, SceneTeam, SceneBuild, SceneRun];

/* --------------------------------- Component -------------------------------- */

export default function EngagementPlayer({
  steps,
  outcomeLabel,
  label,
  stepLabel,
  pauseLabel,
  playLabel,
}: EngagementPlayerProps) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const playing = inView && !hovered && !userPaused && !reduceMotion;
  const total = Math.min(steps.length, SCENES.length);
  const Scene = SCENES[active];
  const step = steps[active];

  const next = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setActive((a) => (a + 1) % total);
  };

  return (
    <div
      ref={ref}
      role='group'
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#16130c] via-[#0d0c0d] to-[#0d0c1c] shadow-[0_20px_60px_rgba(0,0,0,0.25)]'>
        <svg className='absolute inset-0 h-full w-full opacity-[0.07]' aria-hidden='true'>
          <defs>
            <pattern id='player-grid' width='32' height='32' patternUnits='userSpaceOnUse'>
              <path d='M32 0H0V32' fill='none' stroke='#FAF8F9' strokeWidth='1' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#player-grid)' />
        </svg>

        <AnimatePresence mode='wait'>
          <motion.svg
            key={active}
            viewBox='0 0 640 400'
            preserveAspectRatio='xMidYMid meet'
            className='absolute inset-0 h-full w-full'
            aria-hidden='true'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Scene />
          </motion.svg>
        </AnimatePresence>

        {/* Caption */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-8 md:px-6 md:pb-5'>
          <p className='mb-1 font-inconsolata text-xs text-secondary'>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <p className='font-anybody text-sm font-bold text-white md:text-base'>{step.title}</p>
          <p className='mt-1 flex items-start gap-1.5 font-public text-xs text-white/70 md:text-[13px]'>
            <CheckCircle2 className='mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary' aria-hidden='true' />
            <span>
              {outcomeLabel}: {step.outcome}
            </span>
          </p>
        </div>

        <button
          type='button'
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? playLabel : pauseLabel}
          className='absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 transition hover:bg-black/80 hover:text-white'
        >
          {userPaused ? <Play className='h-3.5 w-3.5' /> : <Pause className='h-3.5 w-3.5' />}
        </button>
      </div>

      {/* Step selector with progress */}
      <div className='mt-4 grid gap-2' style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
        {steps.slice(0, total).map((s, i) => (
          <button
            key={s.id}
            type='button'
            onClick={() => setActive(i)}
            aria-label={`${stepLabel} ${i + 1}: ${s.title}`}
            aria-current={i === active ? 'step' : undefined}
            className='group text-left'
          >
            <span className='block h-1 overflow-hidden rounded-full bg-divider'>
              {i < active || (i === active && reduceMotion) ? (
                <span className='block h-full w-full bg-talent' />
              ) : i === active ? (
                <span
                  key={`fill-${active}`}
                  className='block h-full animate-tmt-fill bg-talent'
                  style={{ animationDuration: `${SCENE_SECONDS}s`, animationPlayState: playing ? 'running' : 'paused' }}
                  onAnimationEnd={next}
                />
              ) : null}
            </span>
            <span
              className={`mt-2 block font-public text-xs font-semibold transition-colors ${
                i === active ? 'text-black' : 'text-dark-gray group-hover:text-black'
              }`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
