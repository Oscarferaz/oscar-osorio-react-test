const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/

export const validateEmail = (email: string) => {
    return emailRegex.test(email)
};

export const validatePassword = (password: string) => {
    return passwordRegex.test(password)
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return confirmPassword === password ? true : false
};