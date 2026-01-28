import { API_BASE_URL, API_ENDPOINTS } from './config';

export interface Note {
  id: number;
  created_at: Date;
  notebook_id: number;
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

  static async getNotes(notebookId: string): Promise<GetNotesResponse> {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.NOTES}?notebook_id=${notebookId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    return this.handleResponse<GetNotesResponse>(response);
  }

  static async createNote(
    notebook_id: number,
    title: string,
    content: string,
    order_index: number
  ): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notebook_id, title, content, order_index }),
    });

    return this.handleResponse<Note>(response);
  }

  static async updateNote(
    note_id: string,
    title: string,
    content: string
  ): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}/${note_id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    return this.handleResponse<Note>(response);
  }

  static async deleteNote(note_id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTES}/${note_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    return this.handleResponse<void>(response);
  }
}
