'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/hooks/useGsapPlugins';

const MODAL_DURATION = 0.56;
const MODAL_PADDING = 24;

function getCardRect(card) {
  if (!card) return null;

  const rect = card.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function getTargetRect() {
  const padding = window.innerWidth <= 640 ? 12 : MODAL_PADDING;
  const width = Math.min(1080, Math.max(window.innerWidth - padding * 2, 240));
  const height = Math.min(
    window.innerWidth <= 900 ? 760 : 680,
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

export function ServiceModal({ modalState, onClosed, reduceMotion }) {
  const closeButtonRef = useRef(null);
  const contentRef = useRef(null);
  const innerRef = useRef(null);
  const modalRef = useRef(null);
  const panelRef = useRef(null);
  const previewRef = useRef(null);
  const closingRef = useRef(false);

  const cleanupDocumentState = useCallback(() => {
    document.documentElement.classList.remove('service-modal-open');
    document.body.classList.remove('service-modal-open');
  }, []);

  const requestClose = useCallback(() => {
    if (!modalState || closingRef.current) return;

    const modal = modalRef.current;
    const panel = panelRef.current;
    const inner = innerRef.current;
    const preview = previewRef.current;
    const closeButton = closeButtonRef.current;

    if (!modal || !panel || !inner || !preview || !closeButton) {
      cleanupDocumentState();
      onClosed(modalState);
      return;
    }

    closingRef.current = true;

    const endRect = getCardRect(modalState.card) || getTargetRect();
    const duration = reduceMotion ? 0 : MODAL_DURATION;

    gsap.killTweensOf([modal, panel, inner, preview, closeButton]);
    gsap.set(preview, { autoAlpha: 1 });

    if (duration === 0) {
      setPanelRect(panel, endRect);
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
        closeButton,
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.16,
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
      )
      .to(
        panel,
        {
          top: endRect.top,
          left: endRect.left,
          width: endRect.width,
          height: endRect.height,
          borderRadius: 18,
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
    const preview = previewRef.current;
    const closeButton = closeButtonRef.current;

    if (!modal || !panel || !inner || !preview || !closeButton) return;

    closingRef.current = false;
    document.documentElement.classList.add('service-modal-open');
    document.body.classList.add('service-modal-open');

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const startRect = getCardRect(modalState.card) || getTargetRect();
    const endRect = getTargetRect();
    const duration = reduceMotion ? 0 : MODAL_DURATION;

    gsap.killTweensOf([modal, panel, inner, preview, closeButton]);
    gsap.set(modal, {
      autoAlpha: 1,
      pointerEvents: 'auto',
      backgroundColor: 'rgba(7, 24, 47, 0)',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
    });
    gsap.set(panel, {
      borderRadius: 18,
    });
    setPanelRect(panel, startRect);
    gsap.set(preview, { autoAlpha: 1 });
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
        borderRadius: 30,
      });
      gsap.set(preview, { autoAlpha: 0 });
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
          borderRadius: 30,
          duration,
        },
        0
      )
      .to(
        preview,
        {
          autoAlpha: 0,
          duration: 0.18,
        },
        Math.max(duration - 0.12, 0)
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
      className="service-modal"
      onClick={(event) => {
        if (event.target === modalRef.current) {
          requestClose();
        }
      }}
      ref={modalRef}
    >
      <div
        className="service-modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        <button
          aria-label="Close service details"
          className="service-modal__close"
          onClick={requestClose}
          ref={closeButtonRef}
          type="button"
        >
          X
        </button>
        <div
          className="service-modal__card-preview"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: modalState?.previewHtml || '' }}
          ref={previewRef}
        />
        <div className="service-modal__inner" ref={innerRef}>
          <div className="service-modal__media">
            <div className="service-modal__image-frame">
              {modalState ? (
                <img
                  className="service-modal__image"
                  src={modalState.imageSrc}
                  alt={modalState.imageAlt}
                />
              ) : null}
            </div>
          </div>
          <div className="service-modal__content" ref={contentRef}>
            <div className="pill light service-modal__pill">{modalState?.label}</div>
            <h3 className="service-modal__title" id="service-modal-title">
              {modalState?.title}
            </h3>
            <p className="service-modal__lead">{modalState?.summary}</p>
            <p className="service-modal__copy">{modalState?.copy}</p>
            <ul className="service-modal__points">
              {modalState?.points?.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="service-modal__actions">
              <a className="btn primary service-modal__link" href="services.html">
                Go to services →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
