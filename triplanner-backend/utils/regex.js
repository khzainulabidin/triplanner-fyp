exports.isValidEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
exports.isValidPassword = password => /^[a-zA-Z0-9.,!@]{8,30}$/.test(password);
exports.isValidUsername = username => /^[a-zA-Z0-9_]{4,20}$/.test(username);
exports.isValidName = name => /^[a-zA-Z ]+$/.test(name);
exports.isValidInterest = interest => /^[a-zA-Z- &a]+$/.test(interest);
exports.isValidPhone = phone => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phone);
exports.isValidRating = rating => /^\d+$/.test(rating);
exports.isValidAddress = address => /^[a-zA-Z0-9\s,.'-]{3,}$/.test(address);
exports.isValidZipCode = zip => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
exports.isValidNumber = num => /^\d+$/.test(num);
exports.isValidString = str => /^[a-zA-Z.,:\-_+=|()!;\r\n'"` ]+$/.test(str);
