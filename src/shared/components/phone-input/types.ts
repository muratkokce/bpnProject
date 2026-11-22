import type { ComponentType } from 'react';

import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form';
import type { Mask } from 'react-native-mask-input';
import type { SvgProps } from 'react-native-svg';

import type { TextInputBaseProps } from '@/shared/components/text-input';

export type PhoneCountryCode = {
  code: string;
  name: string;
  flag?: ComponentType<SvgProps>;
};

export type PhoneInputBaseProps = Omit<TextInputBaseProps, 'type' | 'onChangeText'> & {
  countryCode?: string;
  defaultCountryCode?: string;
  countryCodes?: PhoneCountryCode[];
  onCountryCodeChange?: (code: string) => void;
  onChangeText?: (masked: string, unmasked: string) => void;
  mask?: Mask;
};

export type PhoneInputProps<FormValues extends FieldValues = FieldValues> = PhoneInputBaseProps &
  (
    | {
        control: Control<FormValues>;
        name: FieldPathByValue<FormValues, string>;
        countryCodeName?: FieldPathByValue<FormValues, string>;
      }
    | { control?: undefined; name?: never; countryCodeName?: never }
  );
