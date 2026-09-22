"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/* Layout effect where it exists so the "from" states land before first paint
   after hydration; plain effect on the server (where neither runs). */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/* Entrance offsets for [data-reveal] / [data-stagger] values. */
const OFFSETS: Record<string, gsap.TweenVars> = {
  up: { y: 56 },
  left: { x: -90 },
  right: { x: 90 },
  scale: { y: 48, scale: 0.94 },
  fade: {},
  // Pops in from a small scale with a bounce — reads as "emerging out of"
  // whatever it's layered on top of, rather than sliding/fading in.
  bubble: { scale: 0.3, y: 22 },
};

/* "bubble" wants a springy pop instead of the usual ease-out glide. */
function easeFor(kind: string) {
  return kind === "bubble" ? "back.out(1.7)" : "power3.out";
}

const CLEAR = "opacity,transform,x,y,scale,rotate,translate,visibility";

/* Elements carry hover transitions (transform); those would smear every GSAP
   frame, so switch them off while the entrance runs and restore afterwards. */
function freeze(targets: Element[]) {
  targets.forEach((el) => ((el as HTMLElement).style.transition = "none"));
}
function thaw(targets: Element[]) {
  targets.forEach((el) => {
    const node = el as HTMLElement;
    node.style.transition = "";
    if (!node.hasAttribute("data-parallax")) gsap.set(node, { clearProps: CLEAR });
  });
}

function parseCount(text: string) {
  const match = text.trim().match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const digits = match[1].replace(/,/g, "");
  return {
    value: parseFloat(digits),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    suffix: match[2],
  };
}

function heroIntro() {
  const q = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-hero="${name}"]`);
  const nav = q("nav");
  const badge = q("badge");
  const title = q("title");
  const sound = q("sound");
  const copy = q("copy");
  const cta = q("cta");
  const pill = q("pill");
  const phones = q("phones");
  const stats = q("stat");
  const counters = gsap.utils.toArray<HTMLElement>("[data-count]");

  const all = [...nav, ...badge, ...title, ...sound, ...copy, ...cta, ...pill, ...phones, ...stats];
  freeze(all);

  // Stat numbers count up from zero.
  const originals = counters.map((el) => el.textContent ?? "");
  const parsed = counters.map((el, i) => parseCount(originals[i]));
  counters.forEach((el, i) => {
    const info = parsed[i];
    if (info) el.textContent = `${(0).toFixed(info.decimals)}${info.suffix}`;
  });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      thaw(all);
      // Phones drift gently once they have landed.
      gsap.to(phones, {
        y: -12,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  tl.from(nav, { y: -48, opacity: 0, duration: 0.7 })
    .from(badge, { y: -24, opacity: 0, duration: 0.6 }, "-=0.35")
    .from(title, { y: 70, opacity: 0, duration: 0.95 }, "-=0.4")
    .from(
      sound,
      {
        scale: 0.78,
        rotate: -5,
        opacity: 0,
        transformOrigin: "0% 60%",
        duration: 1.2,
        ease: "back.out(1.5)",
      },
      "-=0.65",
    )
    .from(copy, { y: 32, opacity: 0, duration: 0.8 }, "-=0.7")
    .from(cta, { y: 32, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(pill, { x: -36, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(phones, { y: 90, opacity: 0, rotate: 2.5, duration: 1.2 }, "-=1.5")
    .from(stats, { y: 64, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6");

  counters.forEach((el, i) => {
    const info = parsed[i];
    if (!info) return;
    const state = { value: 0 };
    tl.to(
      state,
      {
        value: info.value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          const text = info.decimals
            ? state.value.toFixed(info.decimals)
            : Math.round(state.value).toLocaleString("en-US");
          el.textContent = `${text}${info.suffix}`;
        },
        onComplete: () => {
          el.textContent = originals[i];
        },
      },
      "-=1.2",
    );
  });

  return () => {
    tl.kill();
    gsap.killTweensOf(phones);
    thaw(all);
    counters.forEach((el, i) => (el.textContent = originals[i]));
  };
}

function scrollReveals() {
  // Single elements.
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    const kind = el.dataset.reveal ?? "up";

    if (kind === "neon") {
      // Neon script "switches on": a short flicker, then steady glow.
      freeze([el]);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "clamp(top 90%)", once: true },
        onComplete: () => thaw([el]),
      });
      tl.from(el, { opacity: 0, y: 22, scale: 0.96, duration: 0.55, ease: "power3.out" })
        .to(el, { opacity: 0.3, duration: 0.07 })
        .to(el, { opacity: 1, duration: 0.07 })
        .to(el, { opacity: 0.55, duration: 0.05 })
        .to(el, { opacity: 1, duration: 0.12 });
      return;
    }

    freeze([el]);
    gsap.from(el, {
      ...OFFSETS[kind],
      opacity: 0,
      duration: 0.95,
      ease: easeFor(kind),
      scrollTrigger: { trigger: el, start: "clamp(top 88%)", once: true },
      onComplete: () => thaw([el]),
    });
  });

  // Groups whose children arrive one after another.
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
    const kind = group.dataset.stagger ?? "up";
    const items = Array.from(group.children);
    freeze(items);
    gsap.from(items, {
      ...OFFSETS[kind],
      opacity: 0,
      duration: kind === "bubble" ? 0.65 : 0.8,
      stagger: 0.13,
      ease: easeFor(kind),
      scrollTrigger: { trigger: group, start: "clamp(top 86%)", once: true },
      onComplete: () => thaw(items),
    });
  });

  // Intro statement lights up word by word while it crosses the screen.
  gsap.utils.toArray<HTMLElement>("[data-words]").forEach((block) => {
    const words = Array.from(block.querySelectorAll("[data-word]"));
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: block,
          start: "top 82%",
          end: "bottom 48%",
          scrub: 0.6,
        },
      },
    );
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = parseFloat(el.dataset.parallax ?? "0.08") * 100;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
}

export default function ScrollAnimations() {
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) document.documentElement.classList.remove("anim");

    // Everything below stays static for people who ask for reduced motion.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hand over from the CSS pre-hide: GSAP sets its own inline start states
      // in this same tick, before the browser paints.
      document.documentElement.classList.remove("anim");

      const stopHero = heroIntro();
      scrollReveals();

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const late = window.setTimeout(refresh, 1200);
      document.fonts?.ready.then(refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(late);
        stopHero();
      };
    });

    // Depth scrolling only where the layout is the big desktop composition.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        parallax();
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
