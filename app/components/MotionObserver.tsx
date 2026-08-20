"use client";

import { useEffect } from "react";

export function MotionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const tiltElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    root.classList.add("motion-ready");

    const prefersReducedMotion = reducedMotionQuery.matches;
    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    const observer =
      !prefersReducedMotion && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            },
            { rootMargin: "0px 0px -7%", threshold: 0.1 },
          )
        : null;

    if (observer) {
      revealElements.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
          element.classList.add("is-visible");
          return;
        }

        observer.observe(element);
      });
    } else if (!prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    let animationFrame = 0;

    const updateScrollState = () => {
      animationFrame = 0;

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      const heroProgress = Math.min(1, window.scrollY / window.innerHeight);

      root.style.setProperty("--page-progress", pageProgress.toFixed(4));
      root.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      root.style.setProperty("--hero-shift", `${(-heroProgress * 50).toFixed(2)}px`);
      root.style.setProperty(
        "--hero-rotation",
        `${(heroProgress * 18).toFixed(2)}deg`,
      );
      root.style.setProperty(
        "--hero-scale",
        (1 + heroProgress * 0.06).toFixed(4),
      );
      root.classList.toggle("is-scrolled", window.scrollY > 32);
    };

    const handleScroll = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const tiltCleanups = (prefersReducedMotion ? [] : tiltElements).map((element) => {
      const strength = element.dataset.tiltStrength === "soft" ? 2.5 : 4;

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const horizontalPosition =
          (event.clientX - bounds.left) / bounds.width - 0.5;
        const verticalPosition =
          (event.clientY - bounds.top) / bounds.height - 0.5;

        element.style.setProperty(
          "--tilt-x",
          `${(-verticalPosition * strength).toFixed(2)}deg`,
        );
        element.style.setProperty(
          "--tilt-y",
          `${(horizontalPosition * strength).toFixed(2)}deg`,
        );
        element.style.setProperty(
          "--tilt-shift-x",
          `${(horizontalPosition * 8).toFixed(2)}px`,
        );
        element.style.setProperty(
          "--tilt-shift-y",
          `${(verticalPosition * 8).toFixed(2)}px`,
        );
      };

      const resetTilt = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
        element.style.setProperty("--tilt-shift-x", "0px");
        element.style.setProperty("--tilt-shift-y", "0px");
      };

      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointerleave", resetTilt);

      return () => {
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerleave", resetTilt);
      };
    });

    const revealFallback = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }, 1800);

    return () => {
      window.clearTimeout(revealFallback);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrame !== 0) window.cancelAnimationFrame(animationFrame);
      tiltCleanups.forEach((cleanup) => cleanup());
      observer?.disconnect();
      root.classList.remove("motion-ready", "is-scrolled");
      root.style.removeProperty("--page-progress");
      root.style.removeProperty("--hero-progress");
      root.style.removeProperty("--hero-shift");
      root.style.removeProperty("--hero-rotation");
      root.style.removeProperty("--hero-scale");
    };
  }, []);

  return null;
}
