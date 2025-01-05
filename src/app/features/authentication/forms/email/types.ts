import { AuthState, AuthFormState } from "../../types";
export interface EmailForm { 
    email: string;
};

// export type buttonIconState = "idle" | "submitting" | "error" | "success";

export interface EmailFormComponentProps {
    authServerError?: string;
    onEmailFormSubmit: (data: EmailForm) => void;
};