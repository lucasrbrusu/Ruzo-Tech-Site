export const SITE_URL = 'https://ruzotech.com';

export const pageConfigs = {
  home: {
    sourceFile: 'index.html',
    bodyClassName: 'home-page',
    header: {
      contactHref: '#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products that move the metrics you care about.',
      workHref: '#projects',
      bookHref: '#contact',
    },
  },
  services: {
    sourceFile: 'services.html',
    bodyClassName: 'services-page',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: true,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
  about: {
    sourceFile: 'about.html',
    bodyClassName: 'services-page about-page',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
  request: {
    sourceFile: 'request.html',
    bodyClassName: '',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
  privacy: {
    sourceFile: 'privacy.html',
    bodyClassName: '',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
  terms: {
    sourceFile: 'terms.html',
    bodyClassName: '',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
  cookies: {
    sourceFile: 'cookies.html',
    bodyClassName: '',
    header: {
      contactHref: 'index.html#contact',
      showCurrency: false,
    },
    footer: {
      copy: 'We design and ship digital products and build conversion-driven websites for clients.',
      workHref: 'index.html#projects',
      bookHref: 'index.html#contact',
    },
  },
};

export const pageMetadata = {
  home: {
    title: 'Ruzo Tech | Websites that launch fast',
    description:
      'Ruzo Tech builds its own digital products and offers conversion-focused website design and development.',
    canonicalPath: '/',
  },
  services: {
    title: 'Ruzo Tech | Services & Pricing',
    description:
      'Website design and development services from Ruzo Tech, with transparent website build and maintenance packages.',
    canonicalPath: '/services.html',
  },
  about: {
    title: 'Ruzo Tech | About us',
    description:
      'Learn more about Ruzo Tech, how we work, and why we focus on conversion-driven website delivery.',
    canonicalPath: '/about.html',
  },
  request: {
    title: 'Ruzo Tech | Request a Package',
    description: 'Request a website development package from Ruzo Tech.',
    canonicalPath: '/request.html',
  },
  privacy: {
    title: 'Ruzo Tech | Privacy Policy',
    description:
      'Ruzo Tech Privacy Policy describing how we collect, use, store, and share personal data.',
    canonicalPath: '/privacy.html',
  },
  terms: {
    title: 'Ruzo Tech | Terms of Sale & Service',
    description: 'Ruzo Tech Website Services Agreement (Terms of Sale & Service).',
    canonicalPath: '/terms.html',
  },
  cookies: {
    title: 'Ruzo Tech | Cookie Policy',
    description:
      'Ruzo Tech Cookie Policy covering how we use cookies, consent choices, and how to manage preferences in line with EU/UK requirements.',
    canonicalPath: '/cookies.html',
  },
};

export const homeOrganizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ruzo Tech',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/logo.png`,
  email: 'contact@ruzotech.com',
  telephone: '+447946425792',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@ruzotech.com',
    telephone: '+447946425792',
    url: `${SITE_URL}/#contact`,
  },
};
