import { ENDPOINTS } from '../assets/api';
import { secureStorage } from './storage/storage';

export interface DeadlineCreate {
  title: string;
  due_date: string; // ISO format date string "YYYY-MM-DDThh:mm:ss"
}

export interface DeadlineUpdate {
  title?: string;
  due_date?: string;
}

export interface Deadline {
  id: number;
  title: string;
  due_date: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface DeadlineListResponse {
  items: Deadline[];
  total: number;
}

// Get the auth token from secure storage
const getAuthToken = (): string => {
  // The token is stored with key 'jwt' in the login component
  const token = secureStorage.getString('jwt');
  console.log('DEBUG - Raw token from storage (key="jwt"):', token);
  
  if (!token) {
    console.warn('Authentication token not found in secure storage (key="jwt")');
    return '';
  }
  
  const authHeader = `Bearer ${token}`;
  console.log('DEBUG - Authorization header:', authHeader);
  return authHeader;
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'An error occurred with the deadlines API');
  }
  
  // For DELETE which returns 204 No Content
  if (response.status === 204) {
    return true;
  }
  
  return await response.json();
};

/**
 * Service for interacting with the deadlines API
 */
export const DeadlinesService = {
  /**
   * Get all deadlines for the current user
   */
  async getAllDeadlines(): Promise<DeadlineListResponse> {
    console.log('DEBUG - API Request URL:', ENDPOINTS.deadlines);
    const authToken = getAuthToken();
    
    const headers = {
      'Authorization': authToken,
      'Content-Type': 'application/json',
    };
    
    console.log('DEBUG - Request headers:', headers);
    
    const response = await fetch(ENDPOINTS.deadlines, {
      method: 'GET',
      headers,
    });
    
    console.log('DEBUG - Response status:', response.status);
    
    if (!response.ok) {
      console.error('DEBUG - Error response:', response.status, response.statusText);
      try {
        const errorText = await response.text();
        console.error('DEBUG - Error details:', errorText);
      } catch (error) {
        console.error('DEBUG - Failed to parse error response');
      }
    }
    
    return handleResponse(response);
  },

  /**
   * Get a specific deadline by ID
   */
  async getDeadlineById(deadlineId: number): Promise<Deadline> {
    const response = await fetch(`${ENDPOINTS.deadlines}/${deadlineId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json',
      },
    });

    return handleResponse(response);
  },

  /**
   * Create a new deadline
   */
  async createDeadline(deadlineData: DeadlineCreate): Promise<Deadline> {
    const response = await fetch(ENDPOINTS.deadlines, {
      method: 'POST',
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deadlineData),
    });

    return handleResponse(response);
  },

  /**
   * Update an existing deadline
   */
  async updateDeadline(deadlineId: number, deadlineData: DeadlineUpdate): Promise<Deadline> {
    const response = await fetch(`${ENDPOINTS.deadlines}/${deadlineId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': getAuthToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deadlineData),
    });

    return handleResponse(response);
  },

  /**
   * Delete a deadline
   */
  async deleteDeadline(deadlineId: number): Promise<boolean> {
    const response = await fetch(`${ENDPOINTS.deadlines}/${deadlineId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': getAuthToken(),
      },
    });

    return handleResponse(response);
  }
};

export default DeadlinesService;
