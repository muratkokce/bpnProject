import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { Modal, Pressable, View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import ArrowDownIcon from '@/assets/icons/dropdown-arrow-down.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';
import { TextInput } from '@/shared/components/text-input';

import { DoneButton, ModalOverlay, PickerContainer, PickerHeader, StyledPicker } from './styles';
import type { SelectPickerProps } from './types';

const SelectPicker = ({
  label,
  placeholder,
  options,
  value,
  onSelect,
  doneText = 'Tamam',
  disabled = false,
}: SelectPickerProps) => {
  const { colors, normalizeSize } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [tempValue, setTempValue] = React.useState<string | undefined>(value);

  const selectedOption = options.find((option) => option.value === value);

  const openPicker = () => {
    setTempValue(value ?? options[0]?.value);
    setVisible(true);
  };

  const closePicker = () => setVisible(false);

  const handleDone = () => {
    const nextValue = tempValue ?? options[0]?.value;
    if (nextValue !== undefined) {
      onSelect(nextValue);
    }
    closePicker();
  };

  return (
    <>
      <Pressable disabled={disabled} onPress={openPicker}>
        <View pointerEvents="none">
          <TextInput
            disabled={disabled}
            editable={false}
            label={label}
            placeholder={placeholder}
            right={
              <PaperTextInput.Icon
                icon={() => <ArrowDownIcon height={normalizeSize(18)} width={normalizeSize(18)} />}
              />
            }
            value={selectedOption?.label ?? ''}
          />
        </View>
      </Pressable>

      <Modal transparent animationType="slide" onRequestClose={closePicker} visible={visible}>
        <ModalOverlay onPress={closePicker}>
          <Pressable>
            <PickerContainer>
              <PickerHeader>
                <DoneButton onPress={handleDone}>
                  <Text color={colors.text.primary} variant="titleMedium">
                    {doneText}
                  </Text>
                </DoneButton>
              </PickerHeader>
              <StyledPicker
                onValueChange={(itemValue) => setTempValue(itemValue as string)}
                selectedValue={tempValue}
              >
                {options.map(({ label: optionLabel, value: optionValue }) => (
                  <Picker.Item
                    color={colors.text.primary}
                    key={optionValue}
                    label={optionLabel}
                    value={optionValue}
                  />
                ))}
              </StyledPicker>
            </PickerContainer>
          </Pressable>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export { SelectPicker };
