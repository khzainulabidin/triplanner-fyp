export const isValidEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
export const isValidPassword = password => /^[a-zA-Z0-9.,!@]{8,30}$/.test(password);
export const isValidUsername = username => /^[a-zA-Z0-9_]{4,20}$/.test(username);
export const isValidName = name => /^[a-zA-Z ]+$/.test(name);
export const isValidInterest = interest => /^[a-zA-Z- &a]+$/.test(interest);