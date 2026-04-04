'use client';

import { useEffect, useState } from 'react';
import { CURRENCIES, CURRENCY_KEY, CURRENCY_PRICES } from '@/lib/site-data';

function getStoredCurrency() {
  try {
    const storedCurrency = window.localStorage.getItem(CURRENCY_KEY);
    return storedCurrency && CURRENCIES[storedCurrency] ? storedCurrency : 'GBP';
  } catch {
    return 'GBP';
  }
}

function formatPriceAmount(value) {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function usePricing(pageKey, contentRef) {
  const [currency, setCurrency] = useState('GBP');

  useEffect(() => {
    if (pageKey !== 'services') return;
    setCurrency(getStoredCurrency());
  }, [pageKey]);

  useEffect(() => {
    if (pageKey !== 'services' || !contentRef.current) return;

    const priceLines = contentRef.current.querySelectorAll('[data-price-gbp]');
    const selectedCurrency = CURRENCIES[currency] ? currency : 'GBP';
    const currencyConfig = CURRENCIES[selectedCurrency];

    priceLines.forEach((line) => {
      const priceId = line.dataset.priceId;
      const currencyNode = line.querySelector('.price-currency');
      const amountNode = line.querySelector('.price-amount');

      if (!priceId || !currencyNode || !amountNode) return;

      const displayAmount = CURRENCY_PRICES[selectedCurrency]?.[priceId];
      if (!Number.isFinite(displayAmount)) return;

      currencyNode.textContent = currencyConfig.symbol;
      amountNode.textContent = formatPriceAmount(displayAmount);
    });
  }, [contentRef, currency, pageKey]);

  const updateCurrency = (nextCurrency) => {
    const normalizedCurrency = CURRENCIES[nextCurrency] ? nextCurrency : 'GBP';
    setCurrency(normalizedCurrency);

    try {
      window.localStorage.setItem(CURRENCY_KEY, normalizedCurrency);
    } catch {
      // Ignore persistence failures and keep the visible currency selection.
    }
  };

  return {
    currency,
    setCurrency: updateCurrency,
  };
}
