export const THEME_KEY = 'ruzotech-theme';
export const CURRENCY_KEY = 'ruzotech-currency';
export const COOKIE_CONSENT_KEY = 'ruzotech-cookie-consent';
export const GOOGLE_ANALYTICS_ID = 'G-WZDECN1F54';

export const CURRENCIES = {
  GBP: { symbol: '£' },
  USD: { symbol: '$' },
  EUR: { symbol: '€' },
};

export const CURRENCY_PRICES = {
  GBP: {
    'landing-page': 200,
    business: 450,
    'basic-care': 19,
    'care-plus': 39,
    'ultimate-growth': 79,
    'unlimited-care': 129,
  },
  USD: {
    'landing-page': 250,
    business: 550,
    'basic-care': 24,
    'care-plus': 50,
    'ultimate-growth': 100,
    'unlimited-care': 165,
  },
  EUR: {
    'landing-page': 230,
    business: 530,
    'basic-care': 22,
    'care-plus': 49,
    'ultimate-growth': 90,
    'unlimited-care': 150,
  },
};

export const SERVICE_PANEL_DETAILS = {
  maintenance: {
    copy:
      'This service is built for teams that need the site to stay sharp after launch without treating every update as a separate project. We handle the ongoing technical upkeep and practical changes that keep the website reliable, current, and conversion-ready.',
    points: [
      'Routine edits, content swaps, layout refinements, and post-launch polish.',
      'Bug fixes, plugin or dependency updates, backup checks, and release housekeeping.',
      'Performance reviews and technical cleanup to keep the site loading cleanly.',
      'A consistent support layer so issues are handled before they affect users.',
    ],
  },
  optimisation: {
    copy:
      'This is for websites that are already live but need stronger performance in search, speed, and conversion. We review the page structure, technical setup, and user flow, then make targeted improvements that support visibility and lead generation.',
    points: [
      'SEO-focused page structure, metadata, headings, and on-page content refinements.',
      'Performance improvements across load speed, media handling, and front-end delivery.',
      'Analytics-led CRO changes to sharpen user flow and reduce friction.',
      'Post-launch reporting priorities so changes connect back to real outcomes.',
    ],
  },
  integrations: {
    copy:
      'This service connects your website to the systems behind the business. We set up the technical handoff between the site and the tools you rely on so data, forms, admin workflows, and automations move properly end to end.',
    points: [
      'Database, CMS, and structured form connections tailored to the site workflow.',
      'CRM, booking, payment, and third-party platform integration support.',
      'Admin-side workflow setup for enquiries, content, and internal processing.',
      'Reliable implementation that keeps the website useful beyond the front end alone.',
    ],
  },
};

export const ABOUT_PANEL_DETAILS = {
  story: {
    mediaLabel: 'Ruzo Tech',
    mediaCopy:
      'Bespoke design, thoughtful development, and uncompromising quality at the centre of every build.',
    label: 'Learn more',
    title: 'The creative standard behind Ruzo Tech',
    lead: 'Creativity, collaboration, and performance-led execution shape the way we design and build.',
    copy: [
      'At Ruzo Tech, creativity is at the core of everything we create. What started as a passion for crafting distinctive digital experiences has evolved into a brand centred around bespoke design, thoughtful development, and uncompromising quality. We create websites and applications that are tailored to reflect the ambition, identity, and professionalism of the businesses behind them, helping brands present themselves with confidence and stand apart in a crowded digital space.',
      'We take pride in building with intention, because exceptional results come from genuine care, close collaboration, and a clear creative vision. By involving our clients throughout the journey, we ensure every final product feels true to their brand while carrying the elevated finish and performance-driven approach that defines our work. The result is more than just a digital product, it is a carefully crafted experience designed to inspire trust, strengthen presence, and deliver the kind of impact that moves a brand forward.',
    ],
  },
  founder: {
    mediaLabel: 'Meet Lucas',
    mediaCopy: 'Founder-led development with full stack depth across web and mobile.',
    label: 'Founder story',
    title: 'Meet Lucas',
    lead:
      'Lucas is the founder of Ruzo Tech, a full stack developer who combines technical depth with creative thinking and a strong focus on digital craftsmanship.',
    copy: [
      'Lucas is the founder of Ruzo Tech, a full stack developer with experience in both web and mobile application development, spanning frontend and backend technologies. Currently studying Software Engineering at the University of Portsmouth, he brings together technical depth, creative thinking, and a genuine passion for digital craftsmanship. Ruzo Tech was founded as a way to turn that passion into something meaningful, creating bespoke digital experiences that help brands, businesses, and individuals bring their ideas to life with clarity and confidence.',
      "At the heart of Lucas' approach is a strong belief in collaboration and personal connection. He works closely with every client to understand their vision, their goals, and the identity behind what they want to build, allowing each project to feel intentional, refined, and truly tailored. For him, development is not just about functionality, it is about creating digital products that feel distinctive, perform exceptionally, and deliver real value.",
      "His experience also extends into mobile applications, with projects published on major digital storefronts including the App Store. One of the most notable examples is Pillaflow, an application he fully developed and continues to grow through ongoing development and strategic marketing. Lucas' path into software began early, shaped by a natural curiosity for technology, computers, and the possibilities behind them. What started as an interest in devices, performance, and hardware gradually evolved into a deeper passion for building software and exploring what technology could create.",
      'Looking to the future, Lucas envisions Ruzo Tech growing beyond an individual venture into a wider creative development brand, one that brings together talented collaborators who share the same passion for building exceptional digital products. The goal is to continue shaping ideas into impactful experiences and to grow Ruzo Tech into a name associated with creativity, quality, and purposeful innovation.',
    ],
  },
};

export const REQUEST_PAGE_OPTIONS = {
  defaultType: 'Development Packages',
  defaultPackage: 'Landing Page',
  developmentPackages: ['Landing Page', 'Business', 'Enterprise'],
  packageOptions: {
    'Development Packages': ['Landing Page', 'Business', 'Enterprise'],
    Maintenance: ['Basic Care', 'CarePlus', 'Ultimate Growth', 'Unlimited Care'],
  },
  typeAliases: {
    'Development package': 'Development Packages',
    'Promotion page': 'Development Packages',
    'Business site': 'Development Packages',
    'Complex Enterprise Site': 'Development Packages',
    'Landing page': 'Development Packages',
    'Brochure site (up to 8 pages)': 'Development Packages',
    'Brochure site': 'Development Packages',
    'Business site (up to 8 pages)': 'Development Packages',
    'Advanced business site': 'Development Packages',
  },
  packageAliases: {
    'Promotion page': {
      Basic: 'Landing Page',
      Advanced: 'Landing Page',
    },
    'Business site': {
      Starter: 'Business',
      Advanced: 'Business',
      Pro: 'Business',
    },
    'Complex Enterprise Site': {
      'Basic Enterprise': 'Enterprise',
      'Advanced Enterprise': 'Enterprise',
      'Super Enterprise': 'Enterprise',
    },
  },
};
