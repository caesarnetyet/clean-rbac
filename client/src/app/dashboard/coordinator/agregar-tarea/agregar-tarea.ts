export interface AgregarTareaRequest {
    title: string;
    body: string;
    user_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type TaskNewValidationErrors = {[field: string]: string}

export interface NewTaskResponse {
    message: string,
    errors?: TaskNewValidationErrors
}
