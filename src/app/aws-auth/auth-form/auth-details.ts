export interface AuthDetails {
    email: string;
    password: string;
    confirm_password?: string;
    new_password?: string;
    email_verification?: string;
    confirm_code?: string;
}