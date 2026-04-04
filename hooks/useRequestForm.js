'use client';

import { useEffect } from 'react';
import { REQUEST_PAGE_OPTIONS } from '@/lib/site-data';

export function useRequestForm(pageKey, contentRef) {
  useEffect(() => {
    if (pageKey !== 'request' || !contentRef.current) return;

    const searchParams = new URLSearchParams(window.location.search);

    const summaryType = contentRef.current.querySelector('#summary-type');
    const summaryPackage = contentRef.current.querySelector('#summary-package');
    const typeSelect = contentRef.current.querySelector('#field-type-select');
    const packageSelect = contentRef.current.querySelector('#field-package-select');
    const fieldSubject = contentRef.current.querySelector('#field-subject');

    if (!typeSelect || !packageSelect) return;

    const {
      defaultType,
      defaultPackage,
      packageOptions,
      typeAliases,
      packageAliases,
    } = REQUEST_PAGE_OPTIONS;

    const typeFromQuery = searchParams.get('type') || defaultType;
    const packageFromQuery = searchParams.get('package');
    const normalizedType = typeAliases[typeFromQuery] || typeFromQuery;
    const typeOptions = Object.keys(packageOptions);
    let selectedType = packageOptions[normalizedType] ? normalizedType : defaultType;

    const getAvailablePackages = (type) => packageOptions[type] || packageOptions[defaultType];
    const setSubject = (selectedPackage) => {
      if (fieldSubject) {
        fieldSubject.value = `Dev Request - ${selectedType} - ${selectedPackage}`;
      }
    };
    const setSummary = (selectedPackage) => {
      if (summaryType) summaryType.textContent = selectedType;
      if (summaryPackage) summaryPackage.textContent = selectedPackage;
    };
    const populatePackageSelect = (preferredPackage) => {
      const packages = getAvailablePackages(selectedType);
      packageSelect.innerHTML = '';

      packages.forEach((option) => {
        const nextOption = document.createElement('option');
        nextOption.value = option;
        nextOption.textContent = option;
        packageSelect.appendChild(nextOption);
      });

      const selectedPackage =
        preferredPackage && packages.includes(preferredPackage)
          ? preferredPackage
          : packages[0];

      packageSelect.value = selectedPackage;
      return selectedPackage;
    };

    typeSelect.innerHTML = '';
    typeOptions.forEach((option) => {
      const nextOption = document.createElement('option');
      nextOption.value = option;
      nextOption.textContent = option;
      typeSelect.appendChild(nextOption);
    });
    typeSelect.value = selectedType;

    const aliasedPackage = packageAliases[typeFromQuery]?.[packageFromQuery];
    const initialPackage = populatePackageSelect(
      packageFromQuery && getAvailablePackages(selectedType).includes(packageFromQuery)
        ? packageFromQuery
        : aliasedPackage || defaultPackage
    );

    const handleTypeChange = () => {
      selectedType = typeSelect.value;
      const nextPackage = populatePackageSelect(packageSelect.value);
      setSummary(nextPackage);
      setSubject(nextPackage);
    };

    const handlePackageChange = () => {
      const nextPackage = packageSelect.value;
      setSummary(nextPackage);
      setSubject(nextPackage);
    };

    typeSelect.addEventListener('change', handleTypeChange);
    packageSelect.addEventListener('change', handlePackageChange);

    setSummary(initialPackage);
    setSubject(initialPackage);

    return () => {
      typeSelect.removeEventListener('change', handleTypeChange);
      packageSelect.removeEventListener('change', handlePackageChange);
    };
  }, [contentRef, pageKey]);
}
