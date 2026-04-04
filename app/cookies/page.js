import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('cookies');

export default function CookiesPage() {
  return <SitePage pageKey="cookies" />;
}
