import type { Control, FieldPathByValue, FieldValues } from 'react-hook-form';
import { TextInput as PaperTextInput } from 'react-native-paper';

export type TextInputBaseProps = Omit<React.ComponentProps<typeof PaperTextInput>, 'mode'> & {
  errorMessage?: string;
  type?: 'default' | 'tckn';
  floatingLabel?: boolean;
};

export type TextInputProps<FormValues extends FieldValues = FieldValues> = TextInputBaseProps &
  (
    | { control: Control<FormValues>; name: FieldPathByValue<FormValues, string> }
    | { control?: undefined; name?: never }
  );
