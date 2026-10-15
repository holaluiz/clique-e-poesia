import React from "react";

/* ========================================================================= */
/* HANDWRITTEN EDITORIAL ANNOTATIONS COMPONENT LIBRARY                      */
/* Handcrafted organic strokes, imperfect vectors, authentic pen feel        */
/* ========================================================================= */

interface StrokeProps {
  color?: string;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

/**
 * 1. HANDWRITTEN ARROWS
 * Spontaneous hand-drawn arrows with organic curves and imperfect arrowheads
 */
interface ArrowProps extends StrokeProps {
  variant?: "swoop-right" | "swoop-down-right" | "swoop-up-right" | "curve-left" | "loop" | "direct-down";
  size?: number;
}

export const HandwrittenArrow: React.FC<ArrowProps> = ({
  variant = "swoop-right",
  color = "currentColor",
  strokeWidth = 2.2,
  className = "",
  size = 64,
  style,
}) => {
  switch (variant) {
    case "swoop-down-right":
      return (
        <svg
          width={size}
          height={size * 0.75}
          viewBox="0 0 80 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          {/* Gentle sweeping curve downwards to the right */}
          <path
            d="M 6 10 C 24 6, 48 14, 62 44"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead tip drawn with quick separate pen strokes */}
          <path
            d="M 47 38 C 54 41, 62 44, 64 45 C 63 37, 61 28, 59 22"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "swoop-up-right":
      return (
        <svg
          width={size}
          height={size * 0.65}
          viewBox="0 0 80 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          {/* Rising curve from bottom-left to top-right */}
          <path
            d="M 8 44 C 28 42, 46 36, 68 12"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead */}
          <path
            d="M 52 14 C 60 12, 68 12, 69 11 C 66 18, 62 26, 60 33"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "curve-left":
      return (
        <svg
          width={size}
          height={size * 0.7}
          viewBox="0 0 70 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          <path
            d="M 62 8 C 45 6, 26 16, 12 38"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 23 32 C 16 36, 12 38, 11 39 C 14 31, 18 22, 22 17"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "loop":
      return (
        <svg
          width={size}
          height={size * 0.7}
          viewBox="0 0 90 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          {/* Pen stroke making a small playful loop before extending */}
          <path
            d="M 8 36 C 24 38, 38 46, 42 34 C 44 24, 34 20, 28 26 C 22 34, 30 46, 52 42 C 64 40, 74 34, 82 24"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 70 24 C 77 24, 82 24, 83 23 C 80 30, 77 36, 75 42"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "direct-down":
      return (
        <svg
          width={size * 0.55}
          height={size}
          viewBox="0 0 44 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          <path
            d="M 22 6 C 20 26, 25 48, 22 72"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 12 59 C 17 66, 21 72, 22 73 C 25 67, 30 60, 34 56"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "swoop-right":
    default:
      return (
        <svg
          width={size}
          height={size * 0.45}
          viewBox="0 0 74 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible pointer-events-none ${className}`}
          style={style}
          aria-hidden="true"
        >
          <path
            d="M 6 22 C 24 16, 45 20, 64 12"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 10 C 58 11, 64 12, 65 12 C 60 17, 56 23, 54 27"
            stroke={color}
            strokeWidth={strokeWidth * 0.95}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

/**
 * 2. HANDWRITTEN CIRCLES
 * Quick imperfect circles that wrap around highlighted words like a spontaneous pen circle
 */
interface CircleProps extends StrokeProps {
  children?: React.ReactNode;
  variant?: "loose" | "double" | "oval";
}

export const HandwrittenCircle: React.FC<CircleProps> = ({
  children,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  variant = "loose",
  style,
}) => {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        viewBox="0 0 160 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`absolute -inset-x-2.5 -inset-y-1.5 w-[calc(100%+20px)] h-[calc(100%+12px)] pointer-events-none overflow-visible ${className}`}
        style={style}
        aria-hidden="true"
      >
        {variant === "double" ? (
          <>
            {/* Primary loop */}
            <path
              d="M 18 36 C 14 18, 54 8, 102 9 C 142 10, 154 24, 146 44 C 138 60, 82 62, 34 56 C 14 53, 10 40, 16 28"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Secondary imperfect follow-through */}
            <path
              d="M 24 22 C 38 12, 84 8, 128 12 C 158 15, 156 34, 138 48 C 118 58, 62 60, 36 52"
              stroke={color}
              strokeWidth={strokeWidth * 0.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </>
        ) : (
          /* Single loose authentic pen loop with overlapping ends */
          <path
            d="M 22 42 C 12 28, 28 12, 82 10 C 132 8, 154 22, 148 40 C 140 56, 92 61, 38 58 C 16 56, 8 44, 18 26 C 24 16, 42 12, 60 11"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
};

/**
 * 3. HANDWRITTEN UNDERLINES
 * Organic, gently wave-like or energetic strokes underneath emphatic text
 */
interface UnderlineProps extends StrokeProps {
  children?: React.ReactNode;
  variant?: "gentle-wave" | "double-pen" | "scribble" | "slant-marker";
}

export const HandwrittenUnderline: React.FC<UnderlineProps> = ({
  children,
  color = "currentColor",
  strokeWidth = 2.4,
  className = "",
  variant = "gentle-wave",
  style,
}) => {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        viewBox="0 0 140 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`absolute -bottom-1.5 left-0 w-full h-[14px] pointer-events-none overflow-visible ${className}`}
        style={style}
        aria-hidden="true"
      >
        {variant === "double-pen" ? (
          <>
            <path
              d="M 2 8 C 36 4, 88 5, 138 7"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d="M 12 13 C 48 11, 92 12, 126 14"
              stroke={color}
              strokeWidth={strokeWidth * 0.75}
              strokeLinecap="round"
              opacity="0.75"
            />
          </>
        ) : variant === "scribble" ? (
          <path
            d="M 2 8 C 22 6, 38 12, 54 7 C 72 6, 88 12, 106 8 C 122 7, 132 10, 138 9"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          /* Gentle natural wave */
          <path
            d="M 2 9 C 34 5, 76 12, 138 7"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        )}
      </svg>
    </span>
  );
};

/**
 * 4. HANDWRITTEN ASTERISK
 * Spontaneous 5 or 6-stroke hand-drawn asterisk for quick attention
 */
interface AsteriskProps extends StrokeProps {
  size?: number;
  rotation?: number;
}

export const HandwrittenAsterisk: React.FC<AsteriskProps> = ({
  color = "currentColor",
  strokeWidth = 2.2,
  className = "",
  size = 20,
  rotation = 0,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible pointer-events-none align-middle ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      aria-hidden="true"
    >
      {/* Vertical stroke slightly tilted */}
      <path d="M 12 3 C 12.2 9, 11.8 15, 12 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Diagonal top-left to bottom-right */}
      <path d="M 4 7 C 9 10, 15 14, 20 17" stroke={color} strokeWidth={strokeWidth * 0.95} strokeLinecap="round" />
      {/* Diagonal bottom-left to top-right */}
      <path d="M 5 18 C 10 14, 15 10, 20 6" stroke={color} strokeWidth={strokeWidth * 0.95} strokeLinecap="round" />
    </svg>
  );
};

/**
 * 5. HANDWRITTEN SPARKLE / SCRABBLE DOODLE
 * Small occasional star or organic scribble
 */
interface DoodleProps extends StrokeProps {
  size?: number;
  variant?: "star" | "sparkle" | "smile-doodle";
}

export const HandwrittenDoodle: React.FC<DoodleProps> = ({
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  size = 24,
  variant = "star",
  style,
}) => {
  if (variant === "smile-doodle") {
    return (
      <svg
        width={size * 1.2}
        height={size}
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block overflow-visible pointer-events-none ${className}`}
        style={style}
        aria-hidden="true"
      >
        {/* Quick hand-drawn smiley eyes and curved mouth :) */}
        <circle cx="9" cy="8" r="1.5" fill={color} />
        <circle cx="23" cy="8" r="1.5" fill={color} />
        <path d="M 8 15 C 14 20, 18 20, 24 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* 4-point imperfect star */}
      <path
        d="M 12 2 C 12 7, 14 10, 22 12 C 14 14, 12 17, 12 22 C 12 17, 10 14, 2 12 C 10 10, 12 7, 12 2 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 6. HANDWRITTEN NOTE
 * Editorial spontaneous handwritten text note positioned organically
 * Uses the brand handwriting typography, slight angle, authentic ink color
 */
interface NoteProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
  size?: "sm" | "base" | "lg" | "xl";
}

export const HandwrittenNote: React.FC<NoteProps> = ({
  children,
  className = "",
  rotate = -2,
  color,
  size = "base",
}) => {
  const sizeClasses = {
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-xl sm:text-2xl",
  };

  return (
    <span
      className={`font-handwriting font-medium tracking-wide select-none pointer-events-none inline-block transition-transform duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        color: color,
      }}
    >
      {children}
    </span>
  );
};
