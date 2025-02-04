
export function useAuth() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Usuário não autenticado. Redirecionando para o login...');
        window.location.href = '/login';
    }
}
