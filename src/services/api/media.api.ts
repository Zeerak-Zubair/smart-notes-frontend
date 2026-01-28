import { API_BASE_URL } from './config';
import { TokenStore } from '../auth/tokenStore';

export interface Media {
  id: string;
  created_at: Date;
  note_id: string;
  file_url: string;
  file_type: string;
  file_size: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class MediaApiService {

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ErrorResponse = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));
      throw new Error(error.message);
    }
    return response.json();
  }

  private static getHeaders(isFormData: boolean = false): HeadersInit {
    const token = TokenStore.getAccessToken();
    const headers: any = {
        'Authorization': token ? `Bearer ${token}` : '',
    };
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return headers;
  }

  static async uploadMedia(note_id: string, file: File): Promise<Media> {
    const formData = new FormData();
    formData.append('note_id', note_id);
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/media`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: formData,
    });

    return this.handleResponse<Media>(response);
  }

  static async getMedia(note_id: string): Promise<Media[]> {
    const response = await fetch(`${API_BASE_URL}/api/media?note_id=${note_id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<Media[]>(response);
  }

  static async deleteMedia(media_id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/media/${media_id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<void>(response);
  }
}
