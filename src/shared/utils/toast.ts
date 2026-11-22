import Toast from 'react-native-toast-message';

export type ToastType = 'info' | 'success' | 'error';

interface ShowToastProps {
  message: string;
  type?: ToastType;
  title?: string;
}
const ToastTitles: Record<ToastType, string> = {
  info: 'Bilgi',
  success: 'Başarılı',
  error: 'Hata',
};

export const showToast = ({ message, type = 'info', title }: ShowToastProps) => {
  Toast.show({
    type,
    position: 'top',
    text1: title || ToastTitles[type],
    text2: message,
    visibilityTime: 4000,
  });
};
