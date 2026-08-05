import { BsFillTelephoneFill, BsShieldFillCheck, BsClockFill, BsTagFill } from 'react-icons/bs';
import { getT } from '../../i18n/getT';
import type { Lang } from '../../i18n/types';
import SearchForm from '../SearchForm/SearchForm';
import styles from './Hero.module.scss';
import type { IconType } from 'react-icons';
import Stats from '../Stats/Stats';
import Footer from '../Footer/Footer';

type HeroProps = { lang: Lang };

type Feature = {
  icon: IconType;
  text: string;
};

export default function Hero({ lang }: HeroProps) {
  const t = getT(lang);

  const features: Feature[] = [
    { icon: BsShieldFillCheck, text: t('hero.features.insurance') },
    { icon: BsClockFill, text: t('hero.features.pickup') },
    { icon: BsTagFill, text: t('hero.features.price') },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.overlay} />

        <div className={styles.contactBox}>
          <div className={styles.iconPhoneBlock}>
            <BsFillTelephoneFill className={styles.iconPhone} />
          </div>
          <div className={styles.contactTextBlock}>
            <p className={styles.contactLabel}>{t('hero.contactUs')}</p>
            <p className={styles.contactPhone}>+34 632 230 891</p>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            {t('hero.titleLine1')}
            <br />
            {t('hero.titleLine2')} <span className={styles.accent}>{t('hero.titleAccent')}</span>
          </h1>

          <p className={styles.subtitle}>
            {t('hero.subtitle1')}
            <br />
            {t('hero.subtitle2')}
          </p>

          <ul className={styles.features}>
            {features.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon className={styles.featureIcon} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formWrapper}>
          <SearchForm lang={lang} />
        </div>
      </div>
      <div className={styles.statsWrapper}>
        <Stats lang={lang} />
      </div>
    </section>
  );
}
