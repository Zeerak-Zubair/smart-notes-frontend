import { API_BASE_URL, API_ENDPOINTS } from './config';

export interface Folder {
  id: number;
  created_at: Date;
  title: string;
  user_id: string;
}

export interface GetFoldersResponse {
    folders: Folder[];
}


export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class FoldersApiService {

    private static async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
        const error: ErrorResponse = await response.json().catch(() => ({
            message: 'An unexpected error occurred',
        }));
        throw new Error(error.message);
        }
        return response.json();
    }

    static async createFolder(userId: string, title: string): Promise<Folder> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FOLDERS}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, title }),
    });

    return this.handleResponse<Folder>(response);
  }

    static async getFolders(userId: string | undefined): Promise<GetFoldersResponse> {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.FOLDERS}?user_id=${userId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    return this.handleResponse<GetFoldersResponse>(response);
  }

    static async updateFolders(id: string, title: string): Promise<Folder> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FOLDERS}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    return this.handleResponse<Folder>(response);
  }

}