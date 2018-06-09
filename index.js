const crypto = require('crypto');
const keypair = require('keypair');

exports.generate = ( sizeInBits ) => {
  if( !(typeof sizeInBits==='number' && (sizeInBits%1)===0 && (sizeInBits == 1024 || sizeInBits == 2048)) ) throw Error("Error generating public and private key. Key size can only be 1024 or 2048. Example usage: ` let keys = QuickEncrypt.generate(2048); `");
  return keypair( { bits: sizeInBits } );
}

exports.encrypt = ( payloadString, publicKey ) => {
  if( !(typeof payloadString==='string' && typeof payloadString==='string') ) throw Error("Error encrypting. Payload and Public Key should be in text format. Example usage: ` let encryptedText = QuickEncrypt.encrypt('Some secret text here!', 'the public RSA key in text format here'); ` ");
  try{
    return crypto.publicEncrypt( publicKey, Buffer.from( payloadString, 'utf8' ) ).toString('hex')
  }catch( error ){
    console.log( error );
  }
}

exports.decrypt = ( encryptedString, privateKey ) => {
  if( !(typeof encryptedString==='string' && typeof privateKey==='string') ) throw Error("Error decrypting. Decrypted Text and Private Key should be in text format. Example usage: ` let decryptedText = QuickEncrypt.decrypt('asddd213d19jenacanscasn', 'the private RSA key in text format here'); ` ");
  try{
    return crypto.privateDecrypt({key: privateKey}, Buffer.from( encryptedString, 'hex' )).toString()
  }catch( error ){
    console.log( error );
  }
}