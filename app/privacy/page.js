import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('privacy');

export default function PrivacyPage() {
  return <SitePage pageKey="privacy" />;
}
