'use client';

import type { IconType } from 'react-icons';
import { useField } from 'formik';
import styles from '../FormField/FormField.module.scss';
import selectStyles from './FormSelect.module.scss';

type Option = { value: string; label: string };

type FormSelectProps = {
  name: string;
  label: string;
  icon: IconType;
  options: Option[];
  placeholder: string;
};

export default function FormSelect({
  name,
  label,
  icon: Icon,
  options,
  placeholder,
}: FormSelectProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        <Icon className={styles.labelIcon} />
        {label}
      </label>

      <select
        id={name}
        className={`${selectStyles.select} ${hasError ? styles.inputError : ''}`}
        {...field}
        value={field.value ?? ''}>
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && <span className={styles.error}>{meta.error}</span>}
    </div>
  );
}
