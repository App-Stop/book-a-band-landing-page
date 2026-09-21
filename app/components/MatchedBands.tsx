"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import Icon from "./Icon";
import { matchedBands } from "./site-content";

/* The cards loop forever at every width: the list is rendered three times, the
   scroller starts on the middle copy and silently jumps by one copy width
   whenever it drifts into the outer ones. It also drifts on its own until the
   user touches, hovers or drags it. */
const COPIES = 3;
const AUTO_SPEED = 38; // px per second
const IDLE_MS = 2500; // pause after the user last interacted

export default function MatchedBands() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const count = matchedBands.length;

    let copyWidth = 0;
    let position = 0;
    let lastTouch = 0;
    let lastFrame = 0;
    let hovering = false;
    let visible = true;
    let frame = 0;

    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragMoved = 0;

    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const next = el.children[count] as HTMLElement | undefined;
      if (!first || !next) return false;
      copyWidth = next.offsetLeft - first.offsetLeft;
      return copyWidth > 0;
    };

    const center = () => {
      if (!measure()) return;
      el.scrollLeft = copyWidth;
      position = el.scrollLeft;
    };

    const wrap = () => {
      if (!copyWidth) return;
      if (el.scrollLeft < copyWidth * 0.5) el.scrollLeft += copyWidth;
      else if (el.scrollLeft >= copyWidth * 1.5) el.scrollLeft -= copyWidth;
    };

    const touched = () => {
      lastTouch = performance.now();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(now - lastFrame, 64) / 1000;
      lastFrame = now;
      if (!copyWidth) return;

      const idle = now - lastTouch > IDLE_MS;
      if (!visible || hovering || dragging || !idle || reduceMotion.matches) {
        position = el.scrollLeft;
        return;
      }

      position += AUTO_SPEED * dt;
      el.scrollLeft = position;
      wrap();
      position = el.scrollLeft;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    const onScroll = () => wrap();
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    // Mouse drag (touch already scrolls natively).
    const onPointerDown = (event: PointerEvent) => {
      touched();
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      dragMoved = 0;
      dragStartX = event.clientX;
      dragStartScroll = el.scrollLeft;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = event.clientX - dragStartX;
      dragMoved = Math.max(dragMoved, Math.abs(delta));
      el.scrollLeft = dragStartScroll - delta;
      touched();
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      touched();
    };
    // A drag must not count as a click on "Book in the App".
    const onClickCapture = (event: MouseEvent) => {
      if (dragMoved > 6) {
        event.preventDefault();
        event.stopPropagation();
        dragMoved = 0;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", touched, { passive: true });
    el.addEventListener("touchmove", touched, { passive: true });
    el.addEventListener("wheel", touched, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClickCapture, true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", center);

    center();
    frame = requestAnimationFrame((now) => {
      lastFrame = now;
      tick(now);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", touched);
      el.removeEventListener("touchmove", touched);
      el.removeEventListener("wheel", touched);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", center);
    };
  }, []);

  return (
    <ul
      ref={listRef}
      data-reveal="up"
      className="relative z-10 mt-8 flex cursor-grab gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] active:cursor-grabbing lg:-mt-[57px] short:-mt-[44px] lg:gap-[0.52%] lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        matchedBands.map((band) => {
          const isClone = copy > 0;

          return (
            <li
              key={`${copy}-${band.name}`}
              aria-hidden={isClone || undefined}
              className="relative aspect-[3/4] w-[80vw] max-w-[340px] shrink-0 select-none overflow-hidden rounded-[24px] sm:w-[340px] lg:aspect-[800/600] short:aspect-[800/520] lg:w-[41.667%] lg:max-w-none lg:rounded-[30px]"
            >
              <Image
                src={band.image}
                alt={isClone ? "" : `${band.name} performing live`}
                fill
                draggable={false}
                sizes="(max-width: 1024px) 340px, 42vw"
                className="object-cover"
                style={{ objectPosition: band.imagePosition }}
              />
              <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/95 via-black/65 to-transparent lg:h-[55%] lg:from-black/90 lg:via-black/55" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 lg:gap-3 lg:p-[2.6%]">
                <ul className="flex min-w-0 flex-wrap gap-1.5 lg:gap-2">
                  {band.genres.map((genre) => (
                    <li
                      key={genre}
                      className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[11px] leading-4 backdrop-blur-md lg:px-3 lg:py-[9px] lg:text-sm lg:leading-[21px]"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>

                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-[#1400a6] to-[#6b00aa] px-2.5 py-1 text-[11px] font-semibold leading-4 lg:px-5 lg:py-2 lg:text-base lg:leading-[21px]">
                  Matched
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-[3.75%] lg:pb-[4.5%]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold leading-tight lg:text-2xl lg:leading-[30px]">
                      {band.name}
                    </h3>

                    <p className="mt-1.5 max-w-[520px] text-[13px] leading-[19px] text-white/80 lg:mt-1 lg:text-sm lg:leading-[22px]">
                      {band.blurb}
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-white/80 lg:mt-[7px] lg:text-sm">
                      <Icon name="pin" className="size-4 shrink-0 lg:size-5" />
                      {band.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-3 lg:flex-col lg:items-end lg:justify-start lg:gap-0">
                    <p className="flex items-baseline gap-1 lg:flex-col lg:items-end lg:gap-0">
                      <span className="text-lg font-semibold leading-none lg:text-2xl lg:leading-[30px]">
                        {band.price}
                      </span>
                      <span className="text-xs text-white/80 lg:text-base">
                        /hr
                      </span>
                    </p>
                    <a
                      href="#get-app"
                      draggable={false}
                      tabIndex={isClone ? -1 : undefined}
                      className="whitespace-nowrap rounded-full bg-gradient-to-b from-[#0300a6] to-[#ce00af] px-4 py-2.5 text-[13px] font-semibold leading-none transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] lg:mt-[10px] lg:px-5 lg:py-[10.5px] lg:text-base lg:leading-6"
                    >
                      Book in the App
                    </a>
                  </div>
                </div>
              </div>
            </li>
          );
        }),
      )}
    </ul>
  );
}
