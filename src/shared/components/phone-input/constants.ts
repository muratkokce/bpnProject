import TurkiyeFlag from '@/assets/icons/flags/turkiye.svg';
import UsaFlag from '@/assets/icons/flags/usa.svg';

import type { PhoneCountryCode } from './types';

export const DEFAULT_COUNTRY_CODES: PhoneCountryCode[] = [
  { code: '+90', name: 'Türkiye', flag: TurkiyeFlag },
  { code: '+1', name: 'ABD', flag: UsaFlag },
];

export const DEFAULT_MASK = [
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
];

export const DEFAULT_PHONE_PLACEHOLDER = '(___) ___ __ __';
