import Toast from 'react-native-toast-message';

export type ToastType = 'info' | 'success' | 'error';

interface ShowToastProps {
  message: string;
  type?: ToastType;
  title?: string;
}

export const showToast = ({ message, type = 'info', title }: ShowToastProps) => {
  Toast.show({
    type,
    position: 'top',
    text1: title || type.charAt(0).toUpperCase() + type.slice(1),
    text2: message,
    visibilityTime: 3000,
  });
};
