import { API_BASE_URL, API_ENDPOINTS } from './config';
import { TokenStore } from '../auth/tokenStore';

export type Notebook = {
  id: string;
  created_at: Date;
  title: string;
  description: string;
  color: string;
  updated_at: Date;
  user_id: string;
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


    private static getHeaders(): HeadersInit {
        const token = TokenStore.getAccessToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
    }

    static async getNotebooks(): Promise<GetNotebooksResponse> {
            const response = await fetch(
            `${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}`,
            {
                method: 'GET',
                headers: this.getHeaders(),
            }
            );

            return this.handleResponse<GetNotebooksResponse>(response);
        }

    static async getNotebook(notebook_id: string): Promise<Notebook> {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS_GET}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ notebook_id }),
        });
        return this.handleResponse<Notebook>(response);
    }

    static async createNotebook(title:string, description:string, color:string, order_index:number): Promise<Notebook> {

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ title, description, color, order_index }),
        });

        return this.handleResponse<Notebook>(response);
    }

    static async updateNotebook(notebook_id:string, title: string, description: string, color:string, order_index: number = 0): Promise<Notebook>{

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ notebook_id, title, description, color, order_index }),
        });
        return this.handleResponse<Notebook>(response);
    }

    static async deleteNotebook(notebook_id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NOTEBOOKS}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify({ notebook_id }),
        });
        return this.handleResponse<void>(response);
    }
}