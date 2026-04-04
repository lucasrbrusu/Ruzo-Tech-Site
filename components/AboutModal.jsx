'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/hooks/useGsapPlugins';

const MODAL_DURATION = 0.56;
const MODAL_PADDING = 24;

function getSourceRect(sourceCard) {
  if (!sourceCard) return null;

  const rect = sourceCard.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function getTargetRect() {
  const padding = window.innerWidth <= 640 ? 12 : MODAL_PADDING;
  const width = Math.min(960, Math.max(window.innerWidth - padding * 2, 240));
  const height = Math.min(
    window.innerWidth <= 900 ? 760 : 660,
    Math.max(window.innerHeight - padding * 2, 280)
  );

  return {
    top: Math.max((window.innerHeight - height) / 2, padding),
    left: Math.max((window.innerWidth - width) / 2, padding),
    width,
    height,
  };
}

function setPanelRect(panel, rect) {
  if (!panel || !rect) return;

  gsap.set(panel, {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  });
}

export function AboutModal({ modalState, onClosed, reduceMotion }) {
  const closeButtonRef = useRef(null);
  const contentRef = useRef(null);
  const innerRef = useRef(null);
  const modalRef = useRef(null);
  const panelRef = useRef(null);
  const closingRef = useRef(false);

  const cleanupDocumentState = useCallback(() => {
    document.documentElement.classList.remove('about-modal-open');
    document.body.classList.remove('about-modal-open');
  }, []);

  const requestClose = useCallback(() => {
    if (!modalState || closingRef.current) return;

    const modal = modalRef.current;
    const panel = panelRef.current;
    const inner = innerRef.current;

    if (!modal || !panel || !inner) {
      cleanupDocumentState();
      onClosed(modalState);
      return;
    }

    closingRef.current = true;
    const duration = reduceMotion ? 0 : MODAL_DURATION;

    gsap.killTweensOf([modal, panel, inner]);

    if (duration === 0) {
      gsap.set(modal, {
        autoAlpha: 0,
        pointerEvents: 'none',
        backgroundColor: 'rgba(7, 24, 47, 0)',
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)',
      });
      cleanupDocumentState();
      closingRef.current = false;
      onClosed(modalState);
      return;
    }

    gsap
      .timeline({
        defaults: {
          ease: 'power3.out',
        },
        onComplete: () => {
          cleanupDocumentState();
          closingRef.current = false;
          onClosed(modalState);
        },
      })
      .to(
        inner,
        {
          autoAlpha: 0,
          y: 0,
          scale: 1,
          duration: 0.15,
        },
        0
      )
      .to(
        panel,
        {
          autoAlpha: 0,
          scale: 0.985,
          duration: 0.26,
        },
        0
      )
      .to(
        modal,
        {
          backgroundColor: 'rgba(7, 24, 47, 0)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          duration,
        },
        0
      );
  }, [cleanupDocumentState, modalState, onClosed, reduceMotion]);

  useLayoutEffect(() => {
    if (!modalState) return;

    const modal = modalRef.current;
    const panel = panelRef.current;
    const inner = innerRef.current;
    const closeButton = closeButtonRef.current;

    if (!modal || !panel || !inner || !closeButton) return;

    closingRef.current = false;
    document.documentElement.classList.add('about-modal-open');
    document.body.classList.add('about-modal-open');

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const startRect = getSourceRect(modalState.sourceCard) || getTargetRect();
    const endRect = getTargetRect();
    const duration = reduceMotion ? 0 : MODAL_DURATION;

    gsap.killTweensOf([modal, panel, inner, closeButton]);
    gsap.set(modal, {
      autoAlpha: 1,
      pointerEvents: 'auto',
      backgroundColor: 'rgba(7, 24, 47, 0)',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
    });
    gsap.set(panel, {
      autoAlpha: 1,
      scale: 1,
    });
    setPanelRect(panel, startRect);
    gsap.set(inner, { autoAlpha: 0, y: 24, scale: 0.985 });
    gsap.set(closeButton, { autoAlpha: 0, y: -10 });

    if (duration === 0) {
      gsap.set(modal, {
        backgroundColor: 'rgba(7, 24, 47, 0.42)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      });
      gsap.set(panel, {
        top: endRect.top,
        left: endRect.left,
        width: endRect.width,
        height: endRect.height,
      });
      gsap.set(inner, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(closeButton, { autoAlpha: 1, y: 0 });
      closeButton.focus({ preventScroll: true });
      return;
    }

    gsap
      .timeline({
        defaults: {
          ease: 'power3.out',
        },
        onComplete: () => {
          closeButton.focus({ preventScroll: true });
        },
      })
      .to(
        modal,
        {
          backgroundColor: 'rgba(7, 24, 47, 0.42)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          duration,
        },
        0
      )
      .to(
        panel,
        {
          top: endRect.top,
          left: endRect.left,
          width: endRect.width,
          height: endRect.height,
          duration,
        },
        0
      )
      .to(
        inner,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.44,
        },
        0.14
      )
      .to(
        closeButton,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
        },
        0.14
      );
  }, [modalState, reduceMotion]);

  useEffect(() => {
    if (!modalState) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      requestClose();
    };

    const handleResize = () => {
      if (closingRef.current) return;
      setPanelRect(panelRef.current, getTargetRect());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      cleanupDocumentState();
    };
  }, [cleanupDocumentState, modalState, requestClose]);

  return (
    <div
      aria-hidden={!modalState}
      className="service-modal about-modal"
      id="about-story-modal"
      onClick={(event) => {
        if (event.target === modalRef.current) {
          requestClose();
        }
      }}
      ref={modalRef}
    >
      <div
        className="service-modal__panel about-modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        <button
          className="service-modal__close about-modal__close"
          data-about-modal-close
          aria-label="Close about us details"
          onClick={requestClose}
          ref={closeButtonRef}
          type="button"
        >
          X
        </button>
        <div className="service-modal__inner about-modal__inner" ref={innerRef}>
          <div className="service-modal__media about-modal__media">
            <div className="about-modal__media-stack">
              <div className="pill light about-modal__media-pill">
                {modalState?.details.mediaLabel}
              </div>
              <div className="service-modal__image-frame about-modal__mark-frame">
                <img className="about-modal__logo" src="assets/logo-transparent.png" alt="Ruzo Tech logo" />
              </div>
              <p className="about-modal__media-copy">{modalState?.details.mediaCopy}</p>
            </div>
          </div>
          <div className="service-modal__content about-modal__content" ref={contentRef}>
            <div className="pill light about-modal__pill">{modalState?.details.label}</div>
            <h3 className="service-modal__title about-modal__title" id="about-modal-title">
              {modalState?.details.title}
            </h3>
            <p className="service-modal__lead about-modal__lead">{modalState?.details.lead}</p>
            <div className="about-modal__copy" data-about-modal-copy>
              {modalState?.details.copy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
