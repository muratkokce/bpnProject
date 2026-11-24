export interface SelectPickerOption {
  label: string;
  value: string;
}

export interface SelectPickerProps {
  label?: string;
  placeholder?: string;
  options: SelectPickerOption[];
  value?: string;
  onSelect: (value: string) => void;
  doneText?: string;
  disabled?: boolean;
}
