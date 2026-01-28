import { API_BASE_URL, API_ENDPOINTS } from "./config";
import { TokenStore } from "../auth/tokenStore";

export interface Profile {
  user_id: string;
  created_at: Date;
  name: string;
  updated_at: Date;
  email: string;
  profile_pic_id?: string;
}

export interface ProfilePicture {
  id: string;
  created_at: Date;
  image_url: string;
}

export interface UpdateProfileRequest{
    name: string;
    image?: File;
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

    static async getProfile(userId: string): Promise<Profile> {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}/${userId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
        return this.handleResponse<Profile>(response);
    }

    static async updateProfile(userId: string, data: UpdateProfileRequest): Promise<Profile> {
        const formData = new FormData();
        formData.append('name', data.name);
        
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE}/${userId}`, {
            method: 'PUT',
            headers: this.getHeaders(true),
            body: formData,
        });

        return this.handleResponse<Profile>(response);
    }

    static async updateProfilePicture(image: File): Promise<Profile> {
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE_PICTURE}`, {
            method: 'PUT',
            headers: this.getHeaders(true),
            body: formData,
        });

        return this.handleResponse<Profile>(response);
    }
}