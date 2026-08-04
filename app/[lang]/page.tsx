import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import type { Lang } from '../i18n/types';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  return (
    <div>
      <Hero lang={lang} />
    </div>
  );
}
