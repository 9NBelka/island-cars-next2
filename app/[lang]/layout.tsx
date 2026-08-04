import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { LANGS } from '../i18n/types';
import type { Lang } from '../i18n/types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../globals.scss';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: 'VALG — Car Rental',
  description: 'Discover Spain at your own pace.',
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: Lang }>;
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
