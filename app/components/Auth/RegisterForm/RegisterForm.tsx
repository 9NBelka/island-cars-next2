'use client';

import { Formik, Form } from 'formik';
import {
  BsPersonFill,
  BsEnvelopeFill,
  BsTelephoneFill,
  BsCalendar3,
  BsGlobe,
  BsFlagFill,
  BsBuildingFill,
  BsHouseDoorFill,
  BsMailbox2Flag,
  BsCardChecklist,
  BsFileEarmarkTextFill,
  BsHash,
  BsPersonPlusFill,
} from 'react-icons/bs';
import { getT } from '../../../i18n/getT';
import type { Lang } from '../../../i18n/types';
import LangLink from '../../LangLink/LangLink';
import FormField from '../FormField/FormField';
import FormSelect from '../FormSelect/FormSelect';
import {
  buildRegisterSchema,
  registerInitialValues,
  type RegisterValues,
} from './validationSchema';
import styles from './RegisterForm.module.scss';

type RegisterFormProps = { lang: Lang };

export default function RegisterForm({ lang }: RegisterFormProps) {
  const t = getT(lang);
  const schema = buildRegisterSchema(t);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
  ];

  const documentTypeOptions = [
    { value: 'dni', label: t('auth.register.documentTypes.dni') },
    { value: 'passport', label: t('auth.register.documentTypes.passport') },
    { value: 'nie', label: t('auth.register.documentTypes.nie') },
  ];

  const handleSubmit = (values: RegisterValues) => {
    console.log('register:', values);
  };

  return (
    <div className={styles.mainBlock}>
      <div className={styles.card}>
        <div className={styles.iconTop}>
          <BsPersonPlusFill />
        </div>
        <h1 className={styles.title}>{t('auth.register.title')}</h1>
        <p className={styles.subtitle}>{t('auth.register.subtitle')}</p>

        <Formik
          initialValues={registerInitialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <div className={styles.row}>
              <FormField
                name='firstName'
                label={t('auth.register.firstName')}
                icon={BsPersonFill}
                placeholder={t('auth.register.firstNamePlaceholder')}
              />
              <FormField
                name='lastName'
                label={t('auth.register.lastName')}
                icon={BsPersonFill}
                placeholder={t('auth.register.lastNamePlaceholder')}
              />
            </div>

            <div className={styles.row}>
              <FormField
                name='email'
                label={t('auth.register.email')}
                icon={BsEnvelopeFill}
                type='email'
                placeholder={t('auth.register.emailPlaceholder')}
              />
              <FormField
                name='phone'
                label={t('auth.register.phone')}
                icon={BsTelephoneFill}
                type='tel'
                placeholder={t('auth.register.phonePlaceholder')}
                hint={t('auth.register.phoneHint')}
              />
            </div>

            <div className={styles.row}>
              <FormField
                name='dateOfBirth'
                label={t('auth.register.dateOfBirth')}
                icon={BsCalendar3}
                type='date'
                placeholder={t('auth.register.dateOfBirthPlaceholder')}
              />
              <FormSelect
                name='language'
                label={t('auth.register.language')}
                icon={BsGlobe}
                options={languageOptions}
                placeholder={t('auth.register.language')}
              />
            </div>

            <div className={styles.row}>
              <FormField
                name='country'
                label={t('auth.register.country')}
                icon={BsFlagFill}
                placeholder={t('auth.register.countryPlaceholder')}
              />
              <FormField
                name='city'
                label={t('auth.register.city')}
                icon={BsBuildingFill}
                placeholder={t('auth.register.cityPlaceholder')}
              />
            </div>

            <div className={styles.row}>
              <FormField
                name='address'
                label={t('auth.register.address')}
                icon={BsHouseDoorFill}
                placeholder={t('auth.register.addressPlaceholder')}
              />
              <FormField
                name='postalCode'
                label={t('auth.register.postalCode')}
                icon={BsMailbox2Flag}
                placeholder={t('auth.register.postalCodePlaceholder')}
              />
            </div>

            <FormField
              name='licenseNumber'
              label={t('auth.register.licenseNumber')}
              icon={BsCardChecklist}
              placeholder={t('auth.register.licenseNumberPlaceholder')}
            />

            <div className={styles.row}>
              <FormSelect
                name='documentType'
                label={t('auth.register.documentType')}
                icon={BsFileEarmarkTextFill}
                options={documentTypeOptions}
                placeholder={t('auth.register.documentTypePlaceholder')}
              />
              <FormField
                name='documentNumber'
                label={t('auth.register.documentNumber')}
                icon={BsHash}
                placeholder={t('auth.register.documentNumberPlaceholder')}
              />
            </div>

            <button type='submit' className={styles.submit}>
              {t('auth.register.submit')}
            </button>

            <p className={styles.footerLink}>
              {t('auth.register.haveAccount')}{' '}
              <LangLink lang={lang} href='/login'>
                {t('auth.register.logIn')}
              </LangLink>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
