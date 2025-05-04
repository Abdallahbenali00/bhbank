export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// export const validatePassword = (password) => {
//   const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
//   return regex.test(password);
// };

export const validateCin = (cin) => {
  // Vérifie que le CIN est exactement 8 chiffres
  return /^\d{8}$/.test(cin);
};

export const validateRip = (rip) => {
  // Vérifie que le RIB est exactement 12 chiffres
  return /^\d{12}$/.test(rip);
};
