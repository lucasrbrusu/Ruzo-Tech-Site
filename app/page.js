import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';
import { homeOrganizationJsonLd } from '@/lib/page-config';

export const metadata = createPageMetadata('home');

export default function HomePage() {
  return (
    <SitePage pageKey="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeOrganizationJsonLd) }}
      />
    </SitePage>
  );
}
