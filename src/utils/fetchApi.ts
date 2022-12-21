import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { API_URL } from '@/consts';

export const fetchApi = async <T>(
  endpoint: string,
  options?: AxiosRequestConfig,
) => {
  const result = await axios<any, AxiosResponse<T>>(
    `${API_URL}${endpoint}`,
    options,
  );

  return result.data;
};
