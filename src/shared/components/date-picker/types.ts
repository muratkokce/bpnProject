export interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onSelect: (date: Date) => void;
  doneText?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}
