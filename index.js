const crypto = require('crypto')
const keypair = require('keypair')

const UnknownError = (process) => new Error(`Something went wrong during ${process}`)

const acceptableBitSizes = [1024, 2048];

exports.generate = (sizeInBits) => {
  if (!acceptableBitSizes.includes(sizeInBits)) throw Error('Error generating public and private key. Key size can only be 1024 or 2048. Example usage: ` let keys = QuickEncrypt.generate(2048); `')
  return keypair({ bits: sizeInBits })
}

exports.encrypt = (payloadString, key, usePublicKey = true) => {
  if (typeof payloadString !== 'string' || typeof key !== 'string') throw Error("Error encrypting. Payload and Public/Private Key should be in text format. Example usage: ` let encryptedText = QuickEncrypt.encrypt('Some secret text here!', 'the public RSA key in text format here'); ` ")
  try {
    return usePublicKey ? crypto.publicEncrypt(key, Buffer.from(payloadString, 'utf8')).toString('hex') : crypto.privateEncrypt(key, Buffer.from(payloadString, 'utf8'))
  } catch (error) {
    throw UnknownError('encryption')
  }
}

exports.decrypt = (encryptedString, key,usePrivateKey=true) => {
  if (typeof encryptedString !== 'string' || typeof key !== 'string') throw Error("Error decrypting. Decrypted Text and Public/Private Key should be in text format. Example usage: ` let decryptedText = QuickEncrypt.decrypt('asddd213d19jenacanscasn', 'the private RSA key in text format here'); ` ")
  try {
    return usePrivateKey ? crypto.privateDecrypt({ key }, Buffer.from(encryptedString, 'hex')).toString() : crypto.publicDecrypt({ key }, Buffer.from(encryptedString, 'hex')).toString()
  } catch (error) {
    throw UnknownError('decryption')
  }
}
