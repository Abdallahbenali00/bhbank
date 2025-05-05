export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validateCin = (cin) => /^\d{8}$/.test(cin);
export const validateRip = (rib) => /^\d{12}$/.test(rib);
