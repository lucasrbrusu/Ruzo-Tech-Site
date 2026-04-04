'use client';

import { useLayoutEffect } from 'react';
import { gsap } from '@/hooks/useGsapPlugins';

const INTRO_FADE_DELAY_RATIO = 0.24;
const ABOUT_INTRO_FADE_DISTANCE_RATIO = 0.68;
const PANEL_BREAKPOINT = 901;

function getHomePanelTimeline(section, panel, index) {
  const direction = section.dataset.panelSide === 'left' ? -1 : 1;
  const depthBias = index * 10;

  return gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 56%',
        end: () => {
          const viewportHeight = Math.max(window.innerHeight, 1);
          const exitDistance = Math.min(section.offsetHeight * 0.3, viewportHeight * 0.38);
          return `bottom top+=${Math.round(exitDistance)}`;
        },
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      panel,
      {
        x: direction * 400,
        y: 108,
        z: -500 - depthBias,
        rotateY: direction * 38,
        rotateX: 7.5,
        opacity: 0.02,
      },
      {
        x: 0,
        y: 0,
        z: -depthBias,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.72,
        ease: 'none',
      }
    )
    .to(panel, {
      x: direction * -48,
      y: -32,
      z: -104 - depthBias,
      rotateY: direction * -10,
      rotateX: -2.8,
      opacity: 0.92,
      duration: 0.28,
      ease: 'none',
    });
}

export function usePageAnimations({ contentRef, pageKey, reduceMotion }) {
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const cleanupCallbacks = [];
    const context = gsap.context(() => {
      const landingPromoLines = gsap.utils.toArray('[data-landing-line]');
      const landingIntro = contentRef.current.querySelector('.landing-intro');
      const homeHero = contentRef.current.querySelector('.hero');
      const aboutIntro = contentRef.current.querySelector('.about-intro');

      if (pageKey === 'home' && landingPromoLines.length) {
        gsap.set(landingPromoLines, {
          autoAlpha: 0,
          y: 22,
          rotateX: 78,
          transformOrigin: 'top center',
        });
        gsap.set(landingPromoLines[0], {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
        });

        if (!reduceMotion && landingPromoLines.length > 1) {
          let activeIndex = 0;
          let delayedCall;

          const rotateLines = () => {
            const currentLine = landingPromoLines[activeIndex];
            const nextIndex = (activeIndex + 1) % landingPromoLines.length;
            const nextLine = landingPromoLines[nextIndex];

            currentLine.setAttribute('aria-hidden', 'true');
            nextLine.setAttribute('aria-hidden', 'false');

            gsap.killTweensOf([currentLine, nextLine]);

            const timeline = gsap.timeline({
              onComplete: () => {
                activeIndex = nextIndex;
                delayedCall = gsap.delayedCall(4.2, rotateLines);
              },
            });

            timeline
              .to(currentLine, {
                autoAlpha: 0,
                y: -26,
                rotateX: -82,
                duration: 0.72,
                ease: 'power3.inOut',
              })
              .fromTo(
                nextLine,
                {
                  autoAlpha: 0,
                  y: 22,
                  rotateX: 78,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  rotateX: 0,
                  duration: 0.72,
                  ease: 'power3.out',
                },
                0.08
              );
          };

          delayedCall = gsap.delayedCall(5, rotateLines);
          cleanupCallbacks.push(() => delayedCall?.kill());
        }
      }

      if (pageKey === 'home' && landingIntro && homeHero) {
        if (reduceMotion) {
          gsap.set([landingIntro, homeHero], { clearProps: 'opacity' });
        } else {
          const fadeDistance = Math.max(landingIntro.offsetHeight * 0.7, 1);
          const fadeDelay = fadeDistance * INTRO_FADE_DELAY_RATIO;

          gsap.set(homeHero, { opacity: 0 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: landingIntro,
                start: 'top top',
                end: () => `+=${Math.round(fadeDistance)}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to({}, { duration: fadeDelay / fadeDistance, ease: 'none' })
            .to(
              landingIntro,
              {
                opacity: 0,
                duration: 1 - fadeDelay / fadeDistance,
                ease: 'none',
              },
              fadeDelay / fadeDistance
            )
            .to(
              homeHero,
              {
                opacity: 1,
                duration: 1 - fadeDelay / fadeDistance,
                ease: 'none',
              },
              fadeDelay / fadeDistance
            );
        }
      }

      if (pageKey === 'about' && aboutIntro) {
        if (reduceMotion) {
          gsap.set(aboutIntro, { clearProps: 'opacity' });
        } else {
          const fadeDistance = Math.max(
            aboutIntro.offsetHeight * ABOUT_INTRO_FADE_DISTANCE_RATIO,
            1
          );
          const fadeDelay = fadeDistance * INTRO_FADE_DELAY_RATIO;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: aboutIntro,
                start: 'top top',
                end: () => `+=${Math.round(fadeDistance)}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to({}, { duration: fadeDelay / fadeDistance, ease: 'none' })
            .to(aboutIntro, {
              opacity: 0,
              duration: 1 - fadeDelay / fadeDistance,
              ease: 'none',
            });
        }
      }

      if ((pageKey === 'home' || pageKey === 'about') && !reduceMotion) {
        const mediaQuery = gsap.matchMedia();

        mediaQuery.add(`(min-width: ${PANEL_BREAKPOINT}px)`, () => {
          const sections = gsap.utils.toArray('[data-home-panel]');

          sections.forEach((section, index) => {
            const panel = section.querySelector('.home-stage__panel');
            if (!panel) return;

            getHomePanelTimeline(section, panel, index);
          });
        });

        cleanupCallbacks.push(() => mediaQuery.revert());
      }
    }, contentRef);

    return () => {
      cleanupCallbacks.forEach((callback) => callback());
      context.revert();
    };
  }, [contentRef, pageKey, reduceMotion]);
}
