import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('terms');

export default function TermsPage() {
  return <SitePage pageKey="terms" />;
}
