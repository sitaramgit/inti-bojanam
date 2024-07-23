"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = void 0;
const generateRandomPassword = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
};
exports.generateRandomPassword = generateRandomPassword;
