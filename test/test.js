const test = require('tape')
const td = require('testdouble')

const { generate, encrypt, decrypt } = require('../index')

const message = 'This is some super top secret text!'

test('Error cases', function(t) {
  // Need to add in a test for if encrypt/decrypt throw errors
  t.plan(4)

  t.test('Keypair generation', function(t) {
    t.plan(2)

    t.throws(function () { generate(4096) }, 'Key must be either 1024 or 2048')
    t.throws(function () { generate('4096') }, 'Key cannot be a string')
  })

  t.test('Encryption', function(t) {
    t.plan(2)

    t.throws(function () { encrypt(4096, 'Public key') }, 'Message cannot be a number')
    t.throws(function () { encrypt('message', 2048) }, 'Key cannot be a number')
  })

  t.test('Decryption', function(t) {
    t.plan(2)

    t.throws(function () { decrypt(4096, 'Public key') }, 'Message cannot be a number')
    t.throws(function () { decrypt('message', 2048) }, 'Key cannot be a number')
  })

  t.test('crypto module errors', function(t) {
    t.plan(2)

    const crypto = td.replace('crypto');

    td.when(crypto.publicEncrypt('message', 'Public Key')).thenThrow();
    td.when(crypto.publicDecrypt('message', 'Public Key')).thenThrow();

    t.throws(function () { encrypt('message', 'Public key') }, 'will catch on encrypt')
    t.throws(function () { decrypt('message', 'Public key') }, 'will catch on decrypt')

    td.reset();
  })
})

test('RSA keypair tests', function(t) {
  const keys = generate(1024)

  t.test('Keypair Generation', function (t) {
    t.plan(5)
    t.ok(keys, 'Check keys are defined')
    t.equal(keys.public.slice(0, 31), '-----BEGIN RSA PUBLIC KEY-----\n', 'Public key begins correctly')
    t.equal(keys.public.slice(-29), '-----END RSA PUBLIC KEY-----\n', 'Public key ends correctly')
    t.equal(keys.private.slice(0, 32), '-----BEGIN RSA PRIVATE KEY-----\n', 'Private key begins correctly')
    t.equal(keys.private.slice(-30), '-----END RSA PRIVATE KEY-----\n', 'Private key ends correctly')
  })

  let encryptedText;

  // --- Test 2: Encrypt using public key ---
  t.test('Encryption using public key', function (t) {
    t.plan(2)
    t.ok(encrypt(message, keys.public), 'Encryption succeeds')
    encryptedText = encrypt(message, keys.public);

    let decryptedText;
    // --- Test 3: Decrypt using private key ---
    t.test('Decryption using private key', function (t) {
      t.plan(2)
      t.ok(decrypt(encryptedText, keys.private), 'Decryption succeeds')
      decryptedText = decrypt(encryptedText, keys.private);
      t.equal(decryptedText, message, 'Message is correctly decrypted')
    })
  })
})
