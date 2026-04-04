import { SITE_URL } from '@/lib/page-config';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
};

const themeScript = `
(() => {
  const themeKey = 'ruzotech-theme';
  try {
    const storedTheme = localStorage.getItem(themeKey);
    const theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
