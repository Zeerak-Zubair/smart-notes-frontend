import { API_BASE_URL, API_ENDPOINTS } from './config';
import { TokenStore } from '../auth/tokenStore';

export interface Note {
  id: string;
  created_at: Date;
  notebook_id: string;
  title: string;
  content: string;
  order_index: number;
  updated_at: Date;
}

export interface GetNotesResponse {
  notes: Note[];
  count: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class NotesApiService {

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ErrorResponse = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }));
      throw new Error(error.message);
    }
    return response.json();
  }

  private static getHeaders(): HeadersInit {
    const token = TokenStore.getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  static async getNotes(notebookId: string): Promise<GetNotesResponse> {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.NOTES_LIST}`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ notebook_id: notebookId }),
      }
    );

    return this.handleResponse<GetNotesResponse>(response);
  }

  static async getNote(note_id: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES_GET}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ note_id }),
    });
    return this.handleResponse<Note>(response);
  }

  static async createNote(
    notebook_id: string,
    title: string,
    content: string,
    order_index: number
  ): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ notebook_id, title, content, order_index }),
    });

    return this.handleResponse<Note>(response);
  }

  static async updateNote(
    note_id: string,
    title: string,
    content: string,
    notebook_id?: string,
    order_index?: number
  ): Promise<Note> {
    const body: any = { note_id, title, content };
    if (notebook_id) body.notebook_id = notebook_id;
    if (order_index !== undefined) body.order_index = order_index;

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<Note>(response);
  }

  static async deleteNote(note_id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ note_id }),
    });

    return this.handleResponse<void>(response);
  }
}
