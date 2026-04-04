import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('request');

export default function RequestPage() {
  return <SitePage pageKey="request" />;
}
