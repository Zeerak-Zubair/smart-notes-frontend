import { API_BASE_URL, API_ENDPOINTS } from './config';

export type Notebook = {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  color: string;
  updated_at: Date;
  folder_id: number;
  order_index: number;
};

export interface GetNotebooksResponse{
    notebooks: Notebook[];
    count: number;
}

export interface CreateNotebookDTO {
  title: string;
  description: string;
  color: string;
  folder_id: number;
  order_index: number;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class NotebooksApiService {

    private static async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
        const error: ErrorResponse = await response.json().catch(() => ({
            message: 'An unexpected error occurred',
        }));
        throw new Error(error.message);
        }
        return response.json();
    }

    static async getNotebooks(folderId: string): Promise<GetNotebooksResponse> {
            const response = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}?folder_id=${folderId}`,
            {
                method: 'GET',
                credentials: 'include',
            }
            );

            return this.handleResponse<GetNotebooksResponse>(response);
        }

    static async getNotebooksCount(folderId: string): Promise<number> {
        const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}/count?folder_id=${folderId}`,
        {
            method: 'GET',
            credentials: 'include',
        }
        );

        return this.handleResponse<number>(response);
    }

    static async createNotebook(title:string, description:string, color:string, folder_id:string, order_index:number): Promise<Notebook> {

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, color, folder_id, order_index }),
        });

        return this.handleResponse<Notebook>(response);
    }

    static async updateNotebook(notebook_id:string, title: string, description: string, color:string): Promise<Notebook>{

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}/${notebook_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, color }),
        });
        return this.handleResponse<Notebook>(response);
    }
}