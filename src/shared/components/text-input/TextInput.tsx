import React from 'react';

import { Controller, type FieldValues } from 'react-hook-form';

import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';

import { ErrorText, StyledTextInput } from './styles';
import type { TextInputBaseProps, TextInputProps } from './types';

const TextInputBase = ({
  type = 'default',
  error,
  errorMessage,
  label,
  placeholder,
  floatingLabel = true,
  value,
  defaultValue,
  onChangeText,
  keyboardType,
  maxLength,
  ...props
}: TextInputBaseProps) => {
  const { colors } = useTheme();
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    (defaultValue ?? '').replace(/[^0-9]/g, '')
  );
  const labelContent = label ?? placeholder;

  const handleTcknChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    if (value === undefined) {
      setUncontrolledValue(digits);
    }
    onChangeText?.(digits);
  };

  return (
    <>
      <StyledTextInput
        {...props}
        defaultValue={type === 'tckn' ? undefined : defaultValue}
        error={error}
        keyboardType={type === 'tckn' ? 'number-pad' : keyboardType}
        label={
          floatingLabel && labelContent ? (
            <Text color={colors.text.secondary} variant="bodyMedium">
              {labelContent}
            </Text>
          ) : undefined
        }
        maxLength={maxLength ?? (type === 'tckn' ? 11 : undefined)}
        mode="outlined"
        onChangeText={type === 'tckn' ? handleTcknChange : onChangeText}
        placeholder={!floatingLabel || label ? placeholder : undefined}
        value={type === 'tckn' ? (value ?? uncontrolledValue).replace(/[^0-9]/g, '') : value}
      />
      {error && errorMessage ? (
        <ErrorText accessibilityLiveRegion="polite" color={colors.error}>
          {errorMessage}
        </ErrorText>
      ) : null}
    </>
  );
};

const TextInput = <FormValues extends FieldValues>({
  control,
  name,
  ...props
}: TextInputProps<FormValues>) => {
  if (!control || !name) {
    return <TextInputBase {...props} />;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextInputBase
          {...props}
          error={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          onBlur={(event) => {
            field.onBlur();
            props.onBlur?.(event);
          }}
          onChangeText={(text) => {
            field.onChange(text);
            props.onChangeText?.(text);
          }}
          ref={field.ref}
          value={field.value}
        />
      )}
    />
  );
};

export { TextInput };
