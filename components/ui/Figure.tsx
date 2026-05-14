'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

type FigureScale = 'hero' | 'support' | 'detail';

interface FigureProps {
  /** Public path or imported static image. */
  src: string | StaticImageData;
  /** Required alt — short, descriptive, no "image of". */
  alt: string;
  /** Caption rendered below the frame. Keep one sentence. */
  caption?: React.ReactNode;
  /**
   * Native pixel dimensions of the source. Used by Next.js to reserve
   * layout space and prevent CLS.
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

/**
 * Figure — calm editorial frame for real product screenshots.
 *
 * Three scales replace arbitrary sizing. The frame is intentionally bare:
 * a soft border, a single caption beneath. No Figma-style dot chrome,
 * no internal frame labels — that visual register felt too "exported
 * from a design tool" for an editorial case study.
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
  priority = false,
  className,
}: FigureProps) {
  const { container, sizes } = scaleMap[scale];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.7, ease: ease.standard }}
      className={cn('w-full', container, className)}
    >
      <div className="overflow-hidden rounded-md border border-line-soft bg-surface shadow-[0_1px_0_0_rgba(14,15,14,0.02),0_18px_40px_-28px_rgba(14,15,14,0.06)]">
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
      </div>

      {caption && (
        <figcaption className="mt-4 max-w-[var(--container-prose)] text-body-sm text-ink-3 text-pretty">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
