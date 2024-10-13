import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    login: ({ token }) => {
        localStorage.setItem('token', token);
        set({ user: { token }, token });
    },
    signUp: ({ token }) => {
        localStorage.setItem('token', token);
        set({ user: { token }, token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));

export default useAuthStore;