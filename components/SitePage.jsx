import { PageShell } from '@/components/PageShell';
import { getLegacyMainContent } from '@/lib/legacy-content';
import { pageConfigs } from '@/lib/page-config';

export function SitePage({ children = null, pageKey }) {
  const pageConfig = pageConfigs[pageKey];

  return (
    <PageShell
      bodyClassName={pageConfig.bodyClassName}
      footer={pageConfig.footer}
      header={pageConfig.header}
      pageKey={pageKey}
    >
      {children}
      {getLegacyMainContent(pageConfig.sourceFile)}
    </PageShell>
  );
}
