import * as Yup from 'yup';
import type { TFunction } from '../../../i18n/getT';

export function buildLoginSchema(t: TFunction) {
  return Yup.object({
    email: Yup.string().email(t('errors.invalidEmail')).required(t('errors.required')),
    password: Yup.string().min(8, t('errors.invalidPassword')).required(t('errors.required')),
  });
}

export type LoginValues = { email: string; password: string };

export const loginInitialValues: LoginValues = { email: '', password: '' };
