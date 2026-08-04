import * as Yup from 'yup';
import type { TFunction } from '../../../i18n/getT';

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÑñ\s'-]+$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;
const POSTAL_CODE_REGEX = /^[0-9]{4,10}$/;
const ALPHANUMERIC_REGEX = /^[A-Za-z0-9]{4,20}$/;

export function buildRegisterSchema(t: TFunction) {
  return Yup.object({
    firstName: Yup.string()
      .matches(NAME_REGEX, t('errors.onlyLetters'))
      .required(t('errors.required')),
    lastName: Yup.string()
      .matches(NAME_REGEX, t('errors.onlyLetters'))
      .required(t('errors.required')),
    email: Yup.string().email(t('errors.invalidEmail')).required(t('errors.required')),
    phone: Yup.string()
      .matches(PHONE_REGEX, t('errors.invalidPhone'))
      .required(t('errors.required')),
    dateOfBirth: Yup.date()
      .typeError(t('errors.invalidDate'))
      .required(t('errors.required'))
      .test('is-adult', t('errors.underage'), (value) => {
        if (!value) return false;
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return value <= cutoff;
      }),
    language: Yup.string().required(t('errors.required')),
    country: Yup.string()
      .matches(NAME_REGEX, t('errors.onlyLetters'))
      .required(t('errors.required')),
    city: Yup.string().matches(NAME_REGEX, t('errors.onlyLetters')).required(t('errors.required')),
    address: Yup.string().required(t('errors.required')),
    postalCode: Yup.string()
      .matches(POSTAL_CODE_REGEX, t('errors.invalidPostalCode'))
      .required(t('errors.required')),
    licenseNumber: Yup.string()
      .matches(ALPHANUMERIC_REGEX, t('errors.invalidDocument'))
      .required(t('errors.required')),
    documentType: Yup.string().required(t('errors.required')),
    documentNumber: Yup.string()
      .matches(ALPHANUMERIC_REGEX, t('errors.invalidDocument'))
      .required(t('errors.required')),
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
