// "Y" drawn from the Bungee typeface (SIL Open Font License 1.1,
// Copyright 2023 The Bungee Project Authors, https://github.com/djrrb/Bungee).
export const BRAND_MARK_VIEWBOX = "0 0 85.42 100";

/** Same mark with room for a stroke of up to 6 units (outline rendering). */
export const BRAND_MARK_OUTLINE_VIEWBOX = "-3 -3 91.42 106";

export const BRAND_MARK_PATH =
  "M54.03 100H31.53Q26.53 100 26.53 95V77.22L5.28 48.75Q3.19 45.83 2.01 43.61Q0.83 41.39 0.42 38.68Q0 35.97 0 31.67V5Q0 0 5 0H26.39Q31.39 0 31.39 5V27.78Q31.39 29.17 31.53 30.62Q31.67 32.08 32.64 33.61L39.03 43.61Q40.42 45.97 42.36 45.97H43.75Q45.69 45.97 47.08 43.61L53.47 33.61Q54.44 32.08 54.58 30.62Q54.72 29.17 54.72 27.78V5Q54.72 0 59.72 0H80.42Q85.42 0 85.42 5V31.67Q85.42 35.97 85 38.68Q84.58 41.39 83.4 43.61Q82.22 45.83 80.14 48.75L59.03 77.36V95Q59.03 100 54.03 100Z";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox={BRAND_MARK_VIEWBOX} fill="none" className={className} aria-hidden="true">
      <path fill="currentColor" d={BRAND_MARK_PATH} />
    </svg>
  );
}
