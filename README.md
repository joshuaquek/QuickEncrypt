<p align="center">
  <img src="https://github.com/joshuaquek/github-readme-assets/blob/master/quickencrypt/logo.png?raw=true" height="150px">
  <h2 align="center">⚡️🔐 QuickEncrypt</h2>
  <p align="center">Easily generate RSA Public-Private Keypairs and use them for secure asymmetric one-way encryption and decryption!<p>
  <p align="center">
    <a href="https://github.com/joshuaquek/QuickEncrypt/graphs/commit-activity">
      <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://travis-ci.org/joshuaquek/QuickEncrypt">
      <img src="https://travis-ci.org/joshuaquek/QuickEncrypt.svg?branch=master" />
    </a>
    <a href="https://coveralls.io/github/joshuaquek/QuickEncrypt?branch=master">
      <img src="https://coveralls.io/repos/github/joshuaquek/QuickEncrypt/badge.svg?branch=master" />
    </a>
    <a href="https://standardjs.com">
    	<img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/>
    </a>
    <a href="https://greenkeeper.io/">
    	<img src="https://badges.greenkeeper.io/joshuaquek/QuickEncrypt.svg"/>
    </a>
    <a href="https://snyk.io/test/github/joshuaquek/QuickEncrypt?targetFile=package.json"><img src="https://snyk.io/test/github/joshuaquek/QuickEncrypt/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/joshuaquek/QuickEncrypt?targetFile=package.json" style="max-width:100%;"></a>
    <a href="https://opensource.org/licenses/mit-license.php">
	    <img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103">
    </a>
  </p>
</p>

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

let publicKey = keys.public // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "

let encryptedText = QuickEncrypt.encrypt( 'This is some super top secret text!', publicKey)

console.log(encryptedText) // Some encrypted text: " 01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c...... "

```

Decrypting a secret payload:

```javascript

let privateKey = keys.private // " -----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgQCF5V2bPtBaCBgXOaY52WcbbyM3QxbTYt0lYur..... "

let decryptedText = QuickEncrypt.decrypt( 'The encrypted text string here!', privateKey)

console.log(decryptedText) // The decrypted text: "This is some super top secret text!"

```

Full Example:

```javascript
const QuickEncrypt = require('quick-encrypt')

// --- RSA Keypair Generation ---
let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
console.log(keys) // Generated Public Key and Private Key pair
let publicKey = keys.public
let privateKey = keys.private

// --- Encrypt using public key ---
let encryptedText = QuickEncrypt.encrypt( "This is some super top secret text!", publicKey )
console.log(encryptedText) // This will print out the ENCRYPTED text, for example : " 01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c...... "

// --- Decrypt using private key ---
let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
console.log(decryptedText) // This will print out the DECRYPTED text, which is " This is some super top secret text! "

```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
