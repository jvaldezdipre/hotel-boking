export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
export const isValidPassword = (password) => /^.{8,}$/.test(password);
