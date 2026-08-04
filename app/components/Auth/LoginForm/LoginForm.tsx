'use client';

import { Formik, Form } from 'formik';
import { BsEnvelopeFill, BsLockFill, BsBoxArrowInRight } from 'react-icons/bs';
import { getT } from '../../../i18n/getT';
import type { Lang } from '../../../i18n/types';
import LangLink from '../../LangLink/LangLink';
import FormField from '../FormField/FormField';
import { buildLoginSchema, loginInitialValues, type LoginValues } from './validationSchema';
import styles from '../RegisterForm/RegisterForm.module.scss';
import loginStyles from './LoginForm.module.scss';

type LoginFormProps = { lang: Lang };

export default function LoginForm({ lang }: LoginFormProps) {
  const t = getT(lang);
  const schema = buildLoginSchema(t);

  const handleSubmit = (values: LoginValues) => {
    console.log('login:', values);
  };

  return (
    <div className={styles.mainBlock}>
      <div className={styles.card}>
        <div className={styles.iconTop}>
          <BsBoxArrowInRight />
        </div>
        <h1 className={styles.title}>{t('auth.login.title')}</h1>
        <p className={styles.subtitle}>{t('auth.login.subtitle')}</p>

        <Formik
          initialValues={loginInitialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <FormField
              name='email'
              label={t('auth.login.email')}
              icon={BsEnvelopeFill}
              type='email'
              placeholder={t('auth.login.emailPlaceholder')}
            />
            <FormField
              name='password'
              label={t('auth.login.password')}
              icon={BsLockFill}
              type='password'
              placeholder={t('auth.login.passwordPlaceholder')}
            />

            <LangLink lang={lang} href='/forgot-password' className={loginStyles.forgotLink}>
              {t('auth.login.forgotPassword')}
            </LangLink>

            <button type='submit' className={styles.submit}>
              {t('auth.login.submit')}
            </button>

            <p className={styles.footerLink}>
              {t('auth.login.noAccount')}{' '}
              <LangLink lang={lang} href='/register'>
                {t('auth.login.signUp')}
              </LangLink>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
