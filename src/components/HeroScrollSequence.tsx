import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import "./HeroScrollSequence.css";

const TIMELINE_DURATION = 5.5;
const INTRO_END = 0.5;
const story = [
  { lead: "A gente ama", emphasis: "fotografar." },
  { lead: "A gente ama", emphasis: "escrever." },
  { lead: "Então a gente", emphasis: "criou isso." },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const enterEase = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const exitEase = (value: number) => Math.pow(clamp(value), 2);

function StoryLine({
  timeline,
  index,
  signature = false,
  children,
}: {
  timeline: MotionValue<number>;
  index: number;
  signature?: boolean;
  children: ReactNode;
}) {
  const start = 1.1 + index;
  const opacity = useTransform(timeline, (time) => {
    const entering = enterEase((time - start) / 0.5);
    return signature ? entering : entering * (1 - exitEase((time - start - 0.7) / 0.4));
  });
  const y = useTransform(timeline, (time) => {
    const entering = 40 * (1 - enterEase((time - start) / 0.5));
    const leaving = signature ? 0 : 30 * exitEase((time - start - 0.7) / 0.4);
    return `${entering - leaving}%`;
  });
  const clipPath = useTransform(timeline, (time) =>
    `inset(${100 * (1 - enterEase((time - start) / 0.5))}% 0 0 0)`,
  );

  return (
    <motion.p
      className={`hero-scroll-line${signature ? " hero-scroll-signature" : ""}`}
      style={{ opacity, y, clipPath }}
    >
      {children}
    </motion.p>
  );
}

function Signature({ subtitleOpacity }: { subtitleOpacity?: MotionValue<number> }) {
  return (
    <>
      <span className="hero-scroll-signature-brand">
        Clique <em>e</em> Poesia.
      </span>
      <motion.span className="hero-scroll-signature-sub" style={{ opacity: subtitleOpacity }}>
        cada clique guarda uma história
      </motion.span>
    </>
  );
}

export function HeroScrollSequence({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLElement>(null);
  const introHiddenRef = useRef(false);
  const contentExceedsViewportRef = useRef(false);
  const [introHidden, setIntroHidden] = useState(false);
  const [contentExceedsViewport, setContentExceedsViewport] = useState(false);
  const reducedMotion = useReducedMotion();
  const effectiveStatic = Boolean(reducedMotion) || contentExceedsViewport;

  useLayoutEffect(() => {
    const content = sceneRef.current?.querySelector<HTMLElement>(".hero-content");
    if (!content) return;

    const measureContent = () => {
      // Layout dimensions are stable when the sticky scene becomes normal flow,
      // and ignore the photograph zoom and animated content translation.
      const exceedsViewport = content.offsetTop + content.offsetHeight + 32 > window.innerHeight;
      if (exceedsViewport !== contentExceedsViewportRef.current) {
        contentExceedsViewportRef.current = exceedsViewport;
        setContentExceedsViewport(exceedsViewport);
      }
    };

    measureContent();
    const observer = new ResizeObserver(measureContent);
    observer.observe(content);
    window.addEventListener("resize", measureContent);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureContent);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const timeline = useTransform(scrollYProgress, [0, 1], [0, TIMELINE_DURATION]);
  const backgroundScale = useTransform(timeline, [0, 5], [1, 1.16]);
  const introOpacity = useTransform(timeline, [0, INTRO_END], [1, 0]);
  const introY = useTransform(timeline, [0, INTRO_END], ["0px", "-20px"]);
  const scrimOpacity = useTransform(timeline, [0.2, 1.2], [0, 0.74]);
  const subtitleOpacity = useTransform(timeline, [4.5, 4.9], [0, 1]);

  useMotionValueEvent(timeline, "change", (time) => {
    const nextHidden = !effectiveStatic && time >= INTRO_END;
    // Only the focus/accessibility boundary needs React state; animation stays in Motion values.
    if (nextHidden !== introHiddenRef.current) {
      introHiddenRef.current = nextHidden;
      setIntroHidden(nextHidden);
    }
  });

  const hideIntro = !effectiveStatic && introHidden;
  const sceneStyle = {
    "--hero-bg-scale": backgroundScale,
    "--hero-intro-opacity": introOpacity,
    "--hero-intro-y": introY,
  } as MotionStyle;
  const staticSceneStyle = {
    "--hero-bg-scale": 1,
    "--hero-intro-opacity": 1,
    "--hero-intro-y": "0px",
  } as MotionStyle;

  return (
    <section
      ref={sceneRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="hero-scroll-sequence"
      data-motion={effectiveStatic ? "reduced" : "full"}
    >
      <motion.div className="hero-scroll-stage" style={effectiveStatic ? staticSceneStyle : sceneStyle}>
        <div className="hero-scroll-visual" inert={hideIntro} aria-hidden={hideIntro || undefined}>
          {children}
        </div>
        <motion.div
          className="hero-scroll-scrim"
          aria-hidden="true"
          style={{ opacity: effectiveStatic ? 0 : scrimOpacity }}
        />
        <div className="hero-scroll-story" aria-hidden="true">
          {effectiveStatic ? (
            <>
              {story.map(({ lead, emphasis }) => (
                <p className="hero-scroll-line" key={emphasis}>
                  <span>{lead}</span>
                  <em>{emphasis}</em>
                </p>
              ))}
              <p className="hero-scroll-line hero-scroll-signature">
                <Signature />
              </p>
            </>
          ) : (
            <>
              {story.map(({ lead, emphasis }, index) => (
                <StoryLine timeline={timeline} index={index} key={emphasis}>
                  <span>{lead}</span>
                  <em>{emphasis}</em>
                </StoryLine>
              ))}
              <StoryLine timeline={timeline} index={3} signature>
                <Signature subtitleOpacity={subtitleOpacity} />
              </StoryLine>
            </>
          )}
        </div>
      </motion.div>
      <p className="hero-scroll-accessible-story">
        A gente ama fotografar. A gente ama escrever. Então a gente criou isso: Clique e Poesia.
        Cada clique guarda uma história.
      </p>
    </section>
  );
}
