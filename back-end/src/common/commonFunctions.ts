
export const generateRandomPassword = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  export const generateToken = (id: number, email: string) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ id, email: email }, 'your-secret-key', {
      expiresIn: '8h',
      });
  }