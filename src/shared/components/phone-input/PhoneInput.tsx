import React from 'react';

import { Controller, type FieldValues } from 'react-hook-form';

import { PhoneInputBase } from './components/PhoneInputBase';
import type { PhoneInputBaseProps, PhoneInputProps } from './types';

const PhoneInput = <FormValues extends FieldValues>({
  control,
  name,
  countryCodeName,
  ...props
}: PhoneInputProps<FormValues>) => {
  if (!control || !name) {
    return <PhoneInputBase {...props} />;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const phoneProps: PhoneInputBaseProps = {
          ...props,
          ref: field.ref,
          value: field.value,
          error: !!fieldState.error,
          errorMessage: fieldState.error?.message,
          onBlur: (event) => {
            field.onBlur();
            props.onBlur?.(event);
          },
          onChangeText: (masked, unmasked) => {
            field.onChange(unmasked);
            props.onChangeText?.(masked, unmasked);
          },
        };

        return countryCodeName ? (
          <Controller
            control={control}
            name={countryCodeName}
            render={({ field: countryField }) => (
              <PhoneInputBase
                {...phoneProps}
                countryCode={countryField.value}
                onCountryCodeChange={(code) => {
                  countryField.onChange(code);
                  countryField.onBlur();
                  props.onCountryCodeChange?.(code);
                }}
              />
            )}
          />
        ) : (
          <PhoneInputBase {...phoneProps} />
        );
      }}
    />
  );
};

export { PhoneInput };
