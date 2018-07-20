# ⚡️🔐 QuickEncrypt

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/joshuaquek/QuickEncrypt/graphs/commit-activity)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Easily generate RSA Public-Private Keypairs and use them for secure asymmetric one-way encryption and decryption!

## Installation

  `npm install quick-encrypt`

## Usage

Add this to the js file that you are using it in:

```javascript

let QuickEncrypt = require('quick-encrypt')

```

Generating a RSA Public-Private Keypair:

```javascript

let keys = QuickEncrypt.generate(2048) // Use either 2048 bits or 1024 bits.

console.log(keys.public) // Public Key that has been generated.

console.log(keys.private) // Private Key that has been generated.

```

Encrypting a secret payload:

```javascript

let encryptedText = QuickEncrypt( 'This is some super top secret text!', 'The public key here!')

console.log(encryptedText) // Some encrypted text: '01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c......'

```

Decrypting a secret payload:

```javascript

let decryptedText = QuickEncrypt( 'The encrypted text string here!', 'The private key here!')

console.log(decryptedText) // The decrypted text: 'This is some super top secret text!'

```

Full Example:

```javascript
const QuickEncrypt = require('quick-encrypt')

// --- RSA Keypair Generation ---
let keys = generate(1024)
console.log(keys) // This 

// --- Encrypt using public key ---
let publicKey = keys.public
let encryptedText = encrypt( "This is some super top secret text!", publicKey )
console.log(encryptedText) // This will print out the ENCRYPTED text 

// --- Decrypt using private key ---
let privateKey = keys.private
let decryptedText = decrypt( encryptedText, privateKey)
console.log(decryptedText) // This will print out the DECRYPTED text, which is "This is some super top secret text!"

```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.