import { data } from "react-router";
import { API_BASE_URL, API_ENDPOINTS } from "./config";
import type { User } from './auth.api';

export interface UpdateProfileRequest{
    name: string;
    user_id: string;
    image: File;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export class ProfileApiService{

    private static async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
        const error: ErrorResponse = await response.json().catch(() => ({
            message: 'An unexpected error occurred',
        }));
        throw new Error(error.message);
        }
        return response.json();
    }

    static async updateProfile(id: string, data: UpdateProfileRequest){
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('user_id', data.user_id);
        formData.append('image', data.image);
        console.log(data.name);
        console.log(data.user_id);
        console.log(data.image);
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`, {
            method: 'PUT',
            body: formData,
        });

        return this.handleResponse<User>(response);
    }
    
    
}