const authLocalStorage = {
    setRememberMe: (value: string) => localStorage.setItem('rememberMe', value),
    getRememberMe: () => localStorage.getItem('rememberMe'),
    removeRememberMe: () => localStorage.removeItem('rememberMe')
}

export default authLocalStorage