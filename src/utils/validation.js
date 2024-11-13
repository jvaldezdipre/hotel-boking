export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
export const isValidPassword = (password) => /^.{8,}$/.test(password);
export const isValidDate = (date) =>
  /^(0[1-9]|1[0-2])-([0-2][0-9]|3[01])-\d{4}$/.test(date);
export const isValidRoomType = (roomType) => /^.{3,}$/.test(roomType);
