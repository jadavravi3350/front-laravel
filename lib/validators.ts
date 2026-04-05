export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCarPrice = (price: number): boolean => {
  return price > 0 && price <= 10000000;
};

export const validateYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

export const validateMileage = (mileage: number): boolean => {
  return mileage >= 0 && mileage <= 10000000;
};
