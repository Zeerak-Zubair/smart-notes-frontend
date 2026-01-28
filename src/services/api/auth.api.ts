import type { Session } from '@supabase/supabase-js';
import { API_BASE_URL, API_ENDPOINTS } from './config';

// Response models based on user spec
export interface SignInResponse {
  message: string;
  success: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
}

export interface SignUpResponse {
  message: string;
  success: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  image?: File;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class AuthApiService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ErrorResponse = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));
      throw new Error(error.message);
    }
    return response.json();
  }

  static async signup(data: SignUpRequest): Promise<SignUpResponse> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse<SignUpResponse>(response);
  }

  static async signin(data: SignInRequest): Promise<SignInResponse> {

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return this.handleResponse<SignInResponse>(response);
  }

  static async signout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNOUT}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json().catch(() => ({
        message: 'Failed to sign out',
      }));
      throw new Error(error.message);
    }
  }

  static async getSession(): Promise<{ data: { session: Session | null} }> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SESSION}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return { data: { session: null } };
    }

    const session = await response.json();
    return { data: { session: session } };
  }
}