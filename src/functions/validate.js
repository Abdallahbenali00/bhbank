export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
//   export const validatePassword = (password) => {
//     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
//     return regex.test(password);
//   };

export const validateCin = (cin) => {
    // Check if the CIN is exactly 8 characters long
    if (cin.length !== 8) {
      return false;
    }
  
    // Check if the CIN contains only numbers
    const isNumeric = /^\d+$/.test(cin);
  
    return isNumeric;
  };
  export const validateRip = (cin) => {
    // Check if the CIN is exactly 8 characters long
    if (cin.length !== 8) {
      return false;
    }
  
    // Check if the CIN contains only numbers
    const isNumeric = /^\d+$/.test(cin);
  
    return isNumeric;
  };