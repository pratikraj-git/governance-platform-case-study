'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

type FigureScale = 'hero' | 'support' | 'detail';

/**
 * Editorial aspect ratios. The frame becomes a crop window over the
 * source image — used to isolate a single operational moment from a
 * larger Figma board without re-exporting the asset.
 *
 *   • `auto`        — render at the image's native aspect (no crop)
 *   • `16/10`       — standard cinematic frame (recommended for screens)
 *   • `16/9`        — slightly wider, monitor-like
 *   • `4/3`         — squarer, useful for portrait-leaning UI
 *   • `3/2`         — between 16/10 and 4/3
 */
type FigureAspect = 'auto' | '16/10' | '16/9' | '4/3' | '3/2';

interface FigureProps {
  /** Public path or imported static image. */
  src: string | StaticImageData;
  /** Required alt — short, descriptive, no "image of". */
  alt: string;
  /** Caption rendered below the frame. Keep one sentence. */
  caption?: React.ReactNode;
  /**
   * Native pixel dimensions of the source. Used by Next.js to reserve
   * layout space and prevent CLS when `aspect` is `auto`. Ignored for
   * sizing when an explicit `aspect` is set (the frame controls layout).
   */
  width: number;
  height: number;
  /**
   * Editorial scale — controls maximum width when the figure is rendered
   * standalone. Inside a grid column, the column constrains it.
   *
   *   • `hero`    — centerpiece visual, full container width (1240px)
   *   • `support` — operational support, narrow editorial width (880px)  [default]
   *   • `detail`  — small focused crop, prose width (680px)
   */
  scale?: FigureScale;
  /**
   * Optional editorial crop. When set, the frame is rendered at this
   * aspect ratio and the image is positioned with `object-cover` —
   * effectively a CSS-level crop window. Pair with `objectPosition`
   * to choose which slice of the source is shown.
   */
  aspect?: FigureAspect;
  /**
   * CSS `object-position` value used when `aspect` is set. Defaults to
   * `'center'`. Common values:
   *
   *   • `'center top'`    — show the top portion of a tall board
   *   • `'left top'`      — show the upper-left of a wide board
   *   • `'left center'`   — show the leftmost screen of a horizontal board
   *   • `'50% 18%'`       — fine-tune with percentages
   */
  objectPosition?: string;
  /** Set `true` on the first above-the-fold figure. */
  priority?: boolean;
  className?: string;
}

const scaleMap: Record<FigureScale, { container: string; sizes: string }> = {
  hero: {
    container: 'max-w-[var(--container-max)]',
    sizes: '(min-width: 1280px) 1240px, (min-width: 1024px) 92vw, 100vw',
  },
  support: {
    container: 'max-w-[var(--container-narrow)]',
    sizes: '(min-width: 1024px) 880px, 92vw',
  },
  detail: {
    container: 'max-w-[var(--container-prose)]',
    sizes: '(min-width: 768px) 680px, 92vw',
  },
};

const aspectMap: Record<FigureAspect, string | undefined> = {
  'auto': undefined,
  '16/10': '16 / 10',
  '16/9': '16 / 9',
  '4/3': '4 / 3',
  '3/2': '3 / 2',
};

/**
 * Figure — calm editorial frame for real product screenshots.
 *
 * The frame is intentionally bare: a soft border, a single caption
 * beneath. No Figma-style dot chrome, no internal frame labels — that
 * visual register feels too "exported from a design tool" for an
 * editorial case study.
 *
 * When `aspect` is set, the frame becomes a CSS-level crop window over
 * the source. This means a full Figma board can be displayed as a
 * single, intentional operational moment by picking an aspect + an
 * `objectPosition` — no re-exporting required.
 *
 * `next/image` serves the source responsively (AVIF / WebP, lazy by default).
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  scale = 'support',
  aspect = 'auto',
  objectPosition = 'center',
  priority = false,
  className,
}: FigureProps) {
  const { container, sizes } = scaleMap[scale];
  const aspectCss = aspectMap[aspect];
  const isCropped = aspect !== 'auto';

  return (
    <motion.figure
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.7, ease: ease.standard }}
      className={cn('w-full', container, className)}
    >
      <div
        className={cn(
          'overflow-hidden rounded-md border border-line-soft bg-surface',
          'shadow-[0_1px_0_0_rgba(14,15,14,0.02),0_18px_40px_-28px_rgba(14,15,14,0.06)]',
          isCropped && 'relative w-full',
        )}
        style={isCropped ? { aspectRatio: aspectCss } : undefined}
      >
        {isCropped ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={82}
            className="object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            quality={82}
            className="h-auto w-full"
          />
        )}
      </div>

      {caption && (
        <figcaption className="mt-4 max-w-[var(--container-prose)] text-body-sm text-ink-3 text-pretty">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
