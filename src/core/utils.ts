import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError<{ message?: string; error?: string }>) => {
  if (error.response) {
    return (
      error.response.data?.message ??
      error.response.data?.error ??
      `İstek başarısız oldu (${error.response.status})`
    );
  }
  if (error.request) {
    return 'Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.';
  }
  return error.message || 'Beklenmeyen bir hata oluştu.';
};
