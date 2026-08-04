'use client';

import { useState, type FormEvent } from 'react';
import { getT } from '../../i18n/getT';
import type { Lang } from '../../i18n/types';
import styles from './SearchForm.module.scss';
import CustomSelect from './CustomSelect/CustomSelect';
import DatePicker from './DatePicker/DatePicker';
import TimePicker from './TimePicker/TimePicker';
import { BsArrowRightShort } from 'react-icons/bs';

type SearchFormProps = { lang: Lang };

type FormState = {
  fromPlace: string;
  toPlace: string;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
};

// текущее время, округлённое вверх до ближайшего 30-минутного слота
function getRoundedNow() {
  const now = new Date();
  const minutes = now.getMinutes() < 30 ? 30 : 0;
  const hours = now.getMinutes() < 30 ? now.getHours() : now.getHours() + 1;
  return `${String(hours % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function isToday(dateStr: string) {
  if (!dateStr) return false;
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return dateStr === `${y}-${m}-${d}`;
}

export default function SearchForm({ lang }: SearchFormProps) {
  const t = getT(lang);

  const [placeOpen, setPlaceOpen] = useState<'from' | 'to' | null>(null);
  const [pickerOpen, setPickerOpen] = useState<
    'fromDate' | 'fromTime' | 'toDate' | 'toTime' | null
  >(null);

  const places = [
    { value: 'airport', label: t('form.places.airport') },
    { value: 'office', label: t('form.places.office') },
    { value: 'station', label: t('form.places.station') },
    { value: 'camping', label: t('form.places.camping') },
    { value: 'hotel', label: t('form.places.hotel') },
    { value: 'myLocation', label: t('form.places.myLocation') },
  ];

  const [form, setForm] = useState<FormState>({
    fromPlace: 'airport',
    toPlace: 'airport',
    fromDate: '',
    fromTime: '14:30',
    toDate: '',
    toTime: '14:30',
  });

  const handleSelect = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('search:', form);
  };

  const fromDisabledBefore = isToday(form.fromDate) ? getRoundedNow() : undefined;
  const toMinDate = form.fromDate ? new Date(`${form.fromDate}T00:00:00`) : undefined;
  const toDisabledBefore =
    form.toDate === form.fromDate && isToday(form.toDate) ? getRoundedNow() : undefined;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>{t('form.fromPlace')}</label>
        <CustomSelect
          isOpen={placeOpen === 'from'}
          setIsOpen={(open) => setPlaceOpen(open ? 'from' : null)}
          value={form.fromPlace}
          onChange={handleSelect('fromPlace')}
          options={places}
          placeholder={t('form.fromPlace')}
        />
      </div>

      <div className={styles.field}>
        <label>{t('form.toPlace')}</label>
        <CustomSelect
          isOpen={placeOpen === 'to'}
          setIsOpen={(open) => setPlaceOpen(open ? 'to' : null)}
          value={form.toPlace}
          onChange={handleSelect('toPlace')}
          options={places}
          placeholder={t('form.toPlace')}
        />
      </div>

      <div className={styles.field}>
        <label>{t('form.fromDate')}</label>
        <div className={styles.dateTime}>
          <DatePicker
            isOpen={pickerOpen === 'fromDate'}
            setIsOpen={(open) => setPickerOpen(open ? 'fromDate' : null)}
            value={form.fromDate}
            onChange={handleSelect('fromDate')}
            lang={lang}
            rangeStart={form.fromDate}
            rangeEnd={form.toDate}
          />
          <TimePicker
            isOpen={pickerOpen === 'fromTime'}
            setIsOpen={(open) => setPickerOpen(open ? 'fromTime' : null)}
            value={form.fromTime}
            onChange={handleSelect('fromTime')}
            disabledBefore={fromDisabledBefore}
            workingLabel={t('form.workingHours')}
            offHoursLabel={t('form.offHours')}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>{t('form.toDate')}</label>
        <div className={styles.dateTime}>
          <DatePicker
            isOpen={pickerOpen === 'toDate'}
            setIsOpen={(open) => setPickerOpen(open ? 'toDate' : null)}
            value={form.toDate}
            onChange={handleSelect('toDate')}
            lang={lang}
            minDate={toMinDate}
            rangeStart={form.fromDate}
            rangeEnd={form.toDate}
          />
          <TimePicker
            isOpen={pickerOpen === 'toTime'}
            setIsOpen={(open) => setPickerOpen(open ? 'toTime' : null)}
            value={form.toTime}
            onChange={handleSelect('toTime')}
            disabledBefore={toDisabledBefore}
            workingLabel={t('form.workingHours')}
            offHoursLabel={t('form.offHours')}
          />
        </div>
      </div>

      <button type='submit' className={styles.submit}>
        {t('form.submit')} <BsArrowRightShort className={styles.submitIcon} />
      </button>
    </form>
  );
}
