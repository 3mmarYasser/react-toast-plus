export interface ToastData {
    id: string;
    message: string;
    onClose: (id: string) => void;
    type?: 'success' | 'error' | 'warning' | 'info';
}

