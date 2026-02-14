// src/services/api.ts
// src/services/api.ts
const API_URL = 'http://localhost:3001/api'; // Hardcoded for now

// Your preferred Todo interface
export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}

// DTOs (Data Transfer Objects) for creating/updating
export interface CreateTodoDto {
    text: string;
    completed?: boolean;
}

export interface UpdateTodoDto {
    text?: string;
    completed?: boolean;
}

export interface ApiError {
    message: string;
    status?: number;
}

// Custom error class
export class FetchError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
    }
}

// Helper function for handling fetch responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new FetchError(
            errorData.message || `HTTP error! status: ${response.status}`,
            response.status
        );
    }
    return response.json() as Promise<T>;
}

// Todo API functions
export const todoApi = {
    // Get all todos
    getAllTodos: async (): Promise<ITodo[]> => {
        const response = await fetch(`${API_URL}/todos`);
        return handleResponse<ITodo[]>(response);
    },

    // Get single todo
    getTodo: async (id: string): Promise<ITodo> => {
        const response = await fetch(`${API_URL}/todos/${id}`);
        return handleResponse<ITodo>(response);
    },

    // Create todo
    createTodo: async (data: CreateTodoDto): Promise<ITodo> => {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<ITodo>(response);
    },

    // Update todo
    updateTodo: async (id: string, data: UpdateTodoDto): Promise<ITodo> => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<ITodo>(response);
    },

    // Delete todo
    deleteTodo: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new FetchError(
                errorData.message || `HTTP error! status: ${response.status}`,
                response.status
            );
        }
    },
};