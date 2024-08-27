// node includes a built-in module called crypto.
// Crypto provides a way to encrypt and decrypt data.
// We can use crypto to encrypt the user's password

const crypto = require('node:crypto')

const keyCode = process.env.SECRET_KEY
// in the encryption world, you will hear terms like SALT and PEPPER.
// SALT is a random string that is added to the password before it is encrypted.
// This makes it more difficult for a hacker to decrypt the password.
// PEPPER is a random string that is added to the password after it is encrypted.
// This makes it more difficult for a hacker to decrypt the password.
// The SALT and PEPPER are stored in the .env file.
// in our case, we'll store a SECRET_KEY in our .env file.
const loopCount = 10_000 // underscores in numbers are ignored by JS
// The loop count is the number of times crypto will encrypt the password.
const keyLength = 64 // The length of the encrypted password
const encType = 'sha512' // The type of encryption
// other examples include: sha256, sha1, sha3, etc.

// crypto.pbkdf2Sync is a synchronous function that encrypts the password.
// The function takes 5 arguments:
// the string to encrypt, the SALT, the loop count, the key length, and the encryption type.
// there are other methods of the crypto module, but we'll keep it simple.
module.exports = (pw => crypto.pbkdf2Sync(pw, keyCode, loopCount, keyLength, encType))
// The value returned by crypto.pbkdf2Sync is a buffer.
// Buffers are a way to store binary data.
// They are not exactly strings, but they can be converted to strings.