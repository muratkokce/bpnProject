import React from 'react';

import { useMaskedInputProps } from 'react-native-mask-input';

import { useTheme } from '@/assets/theme';
import { TextInput } from '@/shared/components/text-input';
import { ErrorText } from '@/shared/components/text-input/styles';

import { DEFAULT_COUNTRY_CODES, DEFAULT_MASK, DEFAULT_PHONE_PLACEHOLDER } from '../constants';
import { getPhoneTextStyle, InputRow, PhoneField } from '../styles';
import type { PhoneInputBaseProps } from '../types';

import { CountryCodePicker } from './CountryCodePicker';

const PhoneInputBase = ({
  countryCode,
  defaultCountryCode = '+90',
  countryCodes = DEFAULT_COUNTRY_CODES,
  onCountryCodeChange,
  value,
  defaultValue,
  onChangeText,
  mask = DEFAULT_MASK,
  placeholder = DEFAULT_PHONE_PLACEHOLDER,
  label,
  editable,
  disabled,
  contentStyle,
  error,
  errorMessage,
  ...props
}: PhoneInputBaseProps) => {
  const { colors, normalizeSize } = useTheme();
  const [selectedCode, setSelectedCode] = React.useState(defaultCountryCode);
  const [phoneValue, setPhoneValue] = React.useState(defaultValue ?? '');
  const currentCode = countryCode ?? selectedCode;
  const maskedInput = useMaskedInputProps({
    mask,
    value: value ?? phoneValue,
    onChangeText: (masked, unmasked) => {
      if (value === undefined) {
        setPhoneValue(masked);
      }
      onChangeText?.(masked, unmasked);
    },
  });

  const selectCountryCode = (code: string) => {
    if (countryCode === undefined) {
      setSelectedCode(code);
    }
    onCountryCodeChange?.(code);
  };

  return (
    <>
      <InputRow>
        <CountryCodePicker
          countryCodes={countryCodes}
          disabled={disabled || editable === false}
          onChange={selectCountryCode}
          value={currentCode}
        />
        <PhoneField>
          <TextInput
            {...props}
            accessibilityLabel={
              props.accessibilityLabel ?? (typeof label === 'string' ? label : 'Telefon numarası')
            }
            contentStyle={[getPhoneTextStyle(normalizeSize, colors.text.primary), contentStyle]}
            disabled={disabled}
            editable={editable}
            error={error}
            floatingLabel={false}
            keyboardType="number-pad"
            onChangeText={maskedInput.onChangeText}
            placeholder={placeholder}
            value={maskedInput.value}
          />
        </PhoneField>
      </InputRow>
      {error && errorMessage ? (
        <ErrorText
          accessibilityLiveRegion="polite"
          color={colors.error}
          style={{ top: normalizeSize(-22) }}
        >
          {errorMessage}
        </ErrorText>
      ) : null}
    </>
  );
};

export { PhoneInputBase };
