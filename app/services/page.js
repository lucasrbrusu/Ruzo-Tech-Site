import { SitePage } from '@/components/SitePage';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata('services');

export default function ServicesPage() {
  return <SitePage pageKey="services" />;
}
