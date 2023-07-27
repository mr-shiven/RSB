// Import the required libraries
const SimpleCrypto = require("simple-crypto-js").default;

// Define the encryption and decryption functions
const Encrypt = (plainText, secretKey) => {
    const simpleCrypto = new SimpleCrypto(secretKey);
    const cipherText = simpleCrypto.encrypt(plainText);
    return cipherText;
}

const Decrypt = (cipherText, secretKey) => {
    const simpleCrypto = new SimpleCrypto(secretKey);
    const decipherText = simpleCrypto.decrypt(cipherText);
    return decipherText;
}

// Export the functions
module.exports = {
    Encrypt,
    Decrypt,
};

