/**
 * HerbaAI API Service
 *
 * Provides typed HTTP client methods for all API endpoints.
 * Coordinates with the backend built by the Full-Stack Developer.
 */

import { API } from '../constants/api';
import {
  User,
  Subscription,
  PantryItem,
  PantryScanResult,
  WellnessSuggestion,
  Practitioner,
  Consultation,
  Course,
  Enrollment,
} from '../types';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

// ============================================================
// Auth API
// ============================================================
export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.REGISTER}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(res);
  },

  getProfile: async (): Promise<User> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.PROFILE}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  logout: async (): Promise<void> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.AUTH.LOGOUT}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Pantry API
// ============================================================
export const pantryApi = {
  getItems: async (): Promise<PantryItem[]> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PANTRY.ITEMS}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  addItem: async (ingredientId: string, quantity?: string): Promise<PantryItem> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PANTRY.ADD_ITEM}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ ingredient_id: ingredientId, quantity }),
    });
    return handleResponse(res);
  },

  removeItem: async (itemId: string): Promise<void> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PANTRY.REMOVE_ITEM}`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ id: itemId }),
    });
    return handleResponse(res);
  },

  scan: async (ingredientNames: string[]): Promise<PantryScanResult> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PANTRY.SCAN}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ ingredients: ingredientNames }),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Suggestions API
// ============================================================
export const suggestionsApi = {
  getDaily: async (): Promise<WellnessSuggestion> => {
    const res = await fetch(`${API.BASE_URL}/suggestions/daily`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Subscription API
// ============================================================
export const subscriptionApi = {
  getStatus: async (): Promise<Subscription> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.STATUS}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getPlans: async (): Promise<{ id: string; name: string; price: number; interval: string }[]> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.SUBSCRIPTION.PLANS}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Practitioners API
// ============================================================
export const practitionerApi = {
  list: async (): Promise<Practitioner[]> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRACTITIONERS.LIST}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Consultations API
// ============================================================
export const consultationApi = {
  book: async (practitionerId: string, scheduledAt: string): Promise<Consultation> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRACTITIONERS.BOOK}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ practitioner_id: practitionerId, scheduled_at: scheduledAt }),
    });
    return handleResponse(res);
  },

  list: async (): Promise<Consultation[]> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRACTITIONERS.SCHEDULE}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

// ============================================================
// Courses API
// ============================================================
export const courseApi = {
  list: async (): Promise<Course[]> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.COURSES.LIST}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  enroll: async (courseId: string): Promise<Enrollment> => {
    const res = await fetch(`${API.BASE_URL}${API.ENDPOINTS.COURSES.ENROLL}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ course_id: courseId }),
    });
    return handleResponse(res);
  },
};