// src/api/apiClient.ts
import axios, { AxiosRequestConfig, Method } from 'axios'
import { getBaseUrl } from './config'

interface ApiResponse<T> {
  data?: T
  status: number
  success: boolean
  message: string
}

export const apiClient = async <T>(
  method: Method,
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const url = `${getBaseUrl()}${endpoint}`

  try {
    const response = await axios({
      method,
      url,
      data,
      ...config,
    })

    return {
      data: response.data,
      status: response.status,
      success: true,
      message: 'Success',
    }
  } catch (error: any) {
    const status = error?.response?.status || 500
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'An error occurred'

    return {
      data: undefined,
      status,
      success: false,
      message,
    }
  }
}
