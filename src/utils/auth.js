export const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('current-user');
    return isAuthenticated ? true : false;
}