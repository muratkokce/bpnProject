import React from 'react';

import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Modal, Platform, Pressable, View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import ArrowDownIcon from '@/assets/icons/dropdown-arrow-down.svg';
import { useTheme } from '@/assets/theme';
import { Text } from '@/shared/components/text';
import { TextInput } from '@/shared/components/text-input';

import {
  DatePickerWrapper,
  DoneButton,
  ModalOverlay,
  PickerContainer,
  PickerHeader,
} from './styles';
import type { DatePickerProps } from './types';

const DatePicker = ({
  label,
  placeholder,
  value,
  onSelect,
  doneText = 'Tamam',
  minimumDate,
  maximumDate,
  disabled = false,
}: DatePickerProps) => {
  const { colors, normalizeSize } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date>(value ?? new Date());

  const openPicker = () => {
    setTempDate(value ?? new Date());
    setVisible(true);
  };

  const closePicker = () => setVisible(false);

  const handleDone = () => {
    onSelect(tempDate);
    closePicker();
  };

  const handleAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
    closePicker();
    if (event.type === 'set' && date) {
      onSelect(date);
    }
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
            value={value ? value.toLocaleDateString('tr-TR') : ''}
          />
        </View>
      </Pressable>

      {Platform.OS === 'android' ? (
        visible && (
          <DateTimePicker
            display="default"
            locale="tr-TR"
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            mode="date"
            onChange={handleAndroidChange}
            value={tempDate}
          />
        )
      ) : (
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
                <DatePickerWrapper>
                  <DateTimePicker
                    display="spinner"
                    locale="tr-TR"
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    mode="date"
                    onChange={(_event, date) => date && setTempDate(date)}
                    textColor={colors.text.primary}
                    value={tempDate}
                  />
                </DatePickerWrapper>
              </PickerContainer>
            </Pressable>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
};

export { DatePicker };
