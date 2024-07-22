export const generateRandomPassword = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  export const CLIENT_ID = '905840306296-efb2tdlchip2jmcdq4s2jv1323tkh2ak.apps.googleusercontent.com';
  export const CLIENT_SECRET = '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';