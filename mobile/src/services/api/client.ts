/**
 * AgriSahayak API Client
 * =======================
 * Central HTTP client for all mobile ↔ backend communication.
 *
 * Architecture:
 *   Screen → Feature Hook → Service → API Client → FastAPI Backend
 *
 * Important: Physical Android devices cannot use 'localhost'.
 * Configure EXPO_PUBLIC_API_URL with your local network IP.
 */

import { Platform } from 'react-native';

// ------------------------------------
// Base URL Resolution
// ------------------------------------

const getBaseUrl = (): string => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;

  if (envUrl && envUrl !== 'http://YOUR_LOCAL_IP:8000/api/v1') {
    return envUrl;
  }

  // Development fallbacks
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to reach host localhost
      return 'http://10.0.2.2:8000/api/v1';
    }
    if (Platform.OS === 'ios') {
      return 'http://localhost:8000/api/v1';
    }
  }

  return 'http://10.0.2.2:8000/api/v1';
};

export const BASE_URL = getBaseUrl();

// ------------------------------------
// Request Configuration
// ------------------------------------

const DEFAULT_TIMEOUT = 15000; // 15 seconds

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: object;
  headers?: Record<string, string>;
}

// ------------------------------------
// HTTP Client
// ------------------------------------

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = BASE_URL, timeout: number = DEFAULT_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'UNKNOWN_ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw new ApiError(errorData.message, errorData.error, response.status);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if ((error as Error).name === 'AbortError') {
        throw new ApiError(
          'Request timed out. Check your network connection.',
          'TIMEOUT',
          408
        );
      }

      throw new ApiError(
        'Network error. Make sure the backend is running and the API URL is correct.\n' +
          `Current URL: ${this.baseUrl}`,
        'NETWORK_ERROR',
        0
      );
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async patch<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async put<T>(endpoint: string, body: object): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// ------------------------------------
// Custom API Error
// ------------------------------------

export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ------------------------------------
// Singleton client instance
// ------------------------------------

export const apiClient = new ApiClient();
