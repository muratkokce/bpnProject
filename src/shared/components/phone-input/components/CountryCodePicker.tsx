import React from 'react';

import { Keyboard, Modal, Pressable, StyleSheet, View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import ArrowDownIcon from '@/assets/icons/dropdown-arrow-down.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';
import { TextInput } from '@/shared/components/text-input';

import {
  CountryButton,
  CountryOption,
  CountryOptionLabel,
  getPhoneTextStyle,
  ModalContainer,
  ModalContent,
  ModalTitle,
} from '../styles';
import type { PhoneCountryCode } from '../types';

type CountryCodePickerProps = {
  value: string;
  countryCodes: PhoneCountryCode[];
  disabled?: boolean;
  onChange: (code: string) => void;
};

const CountryCodePicker = ({ value, countryCodes, disabled, onChange }: CountryCodePickerProps) => {
  const { colors, normalizeSize } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const Flag = countryCodes.find((country) => country.code === value)?.flag;

  return (
    <>
      <CountryButton
        accessibilityLabel={`GSM No, ${value}`}
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          setModalVisible(true);
        }}
      >
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
        >
          <TextInput
            contentStyle={[
              getPhoneTextStyle(normalizeSize, colors.text.primary),
              {
                marginLeft: normalizeSize(45),
                marginRight: normalizeSize(45),
              },
            ]}
            editable={false}
            label="GSM No"
            left={
              Flag ? (
                <PaperTextInput.Icon
                  icon={() => <Flag height={normalizeSize(15)} width={normalizeSize(21)} />}
                />
              ) : undefined
            }
            right={
              <PaperTextInput.Icon
                icon={() => <ArrowDownIcon height={normalizeSize(18)} width={normalizeSize(18)} />}
              />
            }
            value={value}
          />
        </View>
      </CountryButton>
      <Modal
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <ModalContainer>
          <Pressable
            accessibilityLabel="Kapat"
            accessibilityRole="button"
            onPress={() => setModalVisible(false)}
            style={StyleSheet.absoluteFill}
          />
          <ModalContent accessibilityViewIsModal>
            <ModalTitle>Ülke kodu</ModalTitle>
            {countryCodes.map(({ code, name, flag: CountryFlagIcon }) => (
              <CountryOption
                accessibilityLabel={`${name}, ${code}`}
                accessibilityRole="radio"
                accessibilityState={{ selected: code === value }}
                key={code}
                onPress={() => {
                  onChange(code);
                  setModalVisible(false);
                }}
              >
                <CountryOptionLabel>
                  {CountryFlagIcon && (
                    <CountryFlagIcon height={normalizeSize(15)} width={normalizeSize(21)} />
                  )}
                  <Text numberOfLines={1} variant="bodyMedium">
                    {name}
                  </Text>
                </CountryOptionLabel>
                <Text color={code === value ? colors.primary500 : undefined} variant="bodyMedium">
                  {code}
                </Text>
              </CountryOption>
            ))}
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

export { CountryCodePicker };
