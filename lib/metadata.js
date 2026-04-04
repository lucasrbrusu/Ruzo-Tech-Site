import { pageMetadata, SITE_URL } from '@/lib/page-config';

export function createPageMetadata(key) {
  const page = pageMetadata[key];

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonicalPath,
    },
    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url: page.canonicalPath,
      images: ['/assets/logo.png'],
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/assets/logo.png'],
    },
  };
}
