import { API_BASE_URL } from '@env';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useLoadingStore } from '@/core/store';
import { showToast } from '@/shared/utils';

import { getErrorMessage } from '../utils';

export const globalAxios = axios.create({
  baseURL: API_BASE_URL,
});

let pendingRequests = 0;
const requestStartTimes = new WeakMap<InternalAxiosRequestConfig, number>();
const minimumLoadingDuration = 500;

globalAxios.interceptors.request.use((config) => {
  pendingRequests += 1;
  requestStartTimes.set(config, Date.now());
  useLoadingStore.getState().setLoading(true);
  return config;
});

const finishRequest = (config?: InternalAxiosRequestConfig) => {
  const startTime = (config && requestStartTimes.get(config)) ?? Date.now();
  const remainingTime = Math.max(0, minimumLoadingDuration - (Date.now() - startTime));
  if (config) {
    requestStartTimes.delete(config);
  }

  const completeRequest = () => {
    pendingRequests = Math.max(0, pendingRequests - 1);
    useLoadingStore.getState().setLoading(pendingRequests > 0);
  };

  if (remainingTime > 0) {
    setTimeout(completeRequest, remainingTime);
  } else {
    completeRequest();
  }
};

globalAxios.interceptors.response.use(
  (response) => {
    finishRequest(response.config);
    return response;
  },
  (error: AxiosError<{ message?: string; error?: string }>) => {
    finishRequest(error?.config);
    showToast({ type: 'error', message: getErrorMessage(error) });
    return Promise.reject(error);
  }
);
