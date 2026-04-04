import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('about');

export default function AboutPage() {
  return <SitePage pageKey="about" />;
}
