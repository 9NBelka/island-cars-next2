import * as Yup from 'yup';
import type { TFunction } from '../../../i18n/getT';

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÑñ\s'-]+$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;
const POSTAL_CODE_REGEX = /^[0-9]{4,10}$/;
const ALPHANUMERIC_REGEX = /^[A-Za-z0-9]{4,20}$/;

export function buildRegisterSchema(t: TFunction) {
  return Yup.object({
    firstName: Yup.string()
      .matches(NAME_REGEX, t('auth.errors.onlyLetters'))
      .required(t('auth.errors.required')),
    lastName: Yup.string()
      .matches(NAME_REGEX, t('auth.errors.onlyLetters'))
      .required(t('auth.errors.required')),
    email: Yup.string().email(t('auth.errors.invalidEmail')).required(t('auth.errors.required')),
    phone: Yup.string()
      .matches(PHONE_REGEX, t('auth.errors.invalidPhone'))
      .required(t('auth.errors.required')),
    dateOfBirth: Yup.date()
      .typeError(t('auth.errors.invalidDate'))
      .required(t('auth.errors.required'))
      .test('is-adult', t('auth.errors.underage'), (value) => {
        if (!value) return false;
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return value <= cutoff;
      }),
    language: Yup.string().required(t('auth.errors.required')),
    country: Yup.string()
      .matches(NAME_REGEX, t('auth.errors.onlyLetters'))
      .required(t('auth.errors.required')),
    city: Yup.string()
      .matches(NAME_REGEX, t('auth.errors.onlyLetters'))
      .required(t('auth.errors.required')),
    address: Yup.string().required(t('auth.errors.required')),
    postalCode: Yup.string()
      .matches(POSTAL_CODE_REGEX, t('auth.errors.invalidPostalCode'))
      .required(t('auth.errors.required')),
    licenseNumber: Yup.string()
      .matches(ALPHANUMERIC_REGEX, t('auth.errors.invalidDocument'))
      .required(t('auth.errors.required')),
    documentType: Yup.string().required(t('auth.errors.required')),
    documentNumber: Yup.string()
      .matches(ALPHANUMERIC_REGEX, t('auth.errors.invalidDocument'))
      .required(t('auth.errors.required')),
  });
}

export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  language: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  licenseNumber: string;
  documentType: string;
  documentNumber: string;
};

export const registerInitialValues: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  language: '',
  country: '',
  city: '',
  address: '',
  postalCode: '',
  licenseNumber: '',
  documentType: '',
  documentNumber: '',
};
