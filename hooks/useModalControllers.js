'use client';

import { useEffect, useState } from 'react';
import { ABOUT_PANEL_DETAILS, SERVICE_PANEL_DETAILS } from '@/lib/site-data';

function getServiceCardData(card) {
  if (!card) return null;

  const key = card.dataset.servicePanel;
  const details = SERVICE_PANEL_DETAILS[key];
  const image = card.querySelector('img');
  const pill = card.querySelector('.pill');
  const title = card.querySelector('h3');
  const summary = card.querySelector('.project-body p');

  if (!details || !image || !title || !summary) {
    return null;
  }

  return {
    key,
    label: pill?.textContent?.trim() || '',
    title: title.textContent.trim(),
    summary: summary.textContent.trim(),
    copy: details.copy,
    points: details.points,
    imageSrc: image.currentSrc || image.getAttribute('src') || '',
    imageAlt: image.getAttribute('alt') || title.textContent.trim(),
  };
}

export function useServiceModalController(pageKey, contentRef) {
  const [serviceModalState, setServiceModalState] = useState(null);

  useEffect(() => {
    if (pageKey !== 'home' || !contentRef.current) return;

    const cards = Array.from(
      contentRef.current.querySelectorAll('#projects .project-card[data-service-panel]')
    );

    cards.forEach((card) => {
      card.setAttribute('aria-expanded', 'false');
    });

    const openModal = (card, restoreFocus) => {
      if (serviceModalState) return;

      const data = getServiceCardData(card);
      if (!data) return;

      card.setAttribute('aria-expanded', 'true');
      setServiceModalState({
        ...data,
        card,
        previewHtml: card.outerHTML,
        restoreFocus,
        lastFocusedElement:
          document.activeElement instanceof HTMLElement ? document.activeElement : card,
      });
    };

    const listeners = cards.map((card) => {
      const clickHandler = () => openModal(card, false);
      const keyHandler = (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openModal(card, true);
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('keydown', keyHandler);

      return () => {
        card.removeEventListener('click', clickHandler);
        card.removeEventListener('keydown', keyHandler);
      };
    });

    return () => {
      listeners.forEach((removeListener) => removeListener());
    };
  }, [contentRef, pageKey, serviceModalState]);

  const clearServiceModal = (closedState) => {
    closedState?.card?.setAttribute('aria-expanded', 'false');

    if (closedState?.restoreFocus && closedState.lastFocusedElement instanceof HTMLElement) {
      closedState.lastFocusedElement.focus({ preventScroll: true });
    } else if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setServiceModalState(null);
  };

  return {
    serviceModalState,
    clearServiceModal,
  };
}

export function useAboutModalController(pageKey, contentRef) {
  const [aboutModalState, setAboutModalState] = useState(null);

  useEffect(() => {
    if (pageKey !== 'about' || !contentRef.current) return;

    const triggers = Array.from(contentRef.current.querySelectorAll('[data-about-detail-trigger]'));

    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
    });

    const openModal = (trigger) => {
      if (aboutModalState) return;

      const detailKey = trigger.dataset.aboutDetailTrigger;
      const details = ABOUT_PANEL_DETAILS[detailKey];
      if (!details) return;

      trigger.setAttribute('aria-expanded', 'true');
      setAboutModalState({
        detailKey,
        details,
        trigger,
        sourceCard: trigger.closest('[data-about-detail-card]'),
        lastFocusedElement:
          document.activeElement instanceof HTMLElement ? document.activeElement : trigger,
      });
    };

    const listeners = triggers.map((trigger) => {
      const clickHandler = () => openModal(trigger);
      trigger.addEventListener('click', clickHandler);

      return () => {
        trigger.removeEventListener('click', clickHandler);
      };
    });

    return () => {
      listeners.forEach((removeListener) => removeListener());
    };
  }, [aboutModalState, contentRef, pageKey]);

  const clearAboutModal = (closedState) => {
    closedState?.trigger?.setAttribute('aria-expanded', 'false');

    if (closedState?.lastFocusedElement instanceof HTMLElement) {
      closedState.lastFocusedElement.focus({ preventScroll: true });
    }

    setAboutModalState(null);
  };

  return {
    aboutModalState,
    clearAboutModal,
  };
}
