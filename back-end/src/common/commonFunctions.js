"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_SECRET = exports.CLIENT_ID = exports.generateRandomPassword = void 0;
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
exports.CLIENT_ID = '905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com';
exports.CLIENT_SECRET = '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';
