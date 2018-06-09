const { generate, encrypt, decrypt } = require('../index')
console.log("\n\n\n\n")


// --- Test 1: Keypair Generation ---
console.log(" --- Test 1: Keypair Generation --- \n")
let keys = generate(1024)
console.log(keys)
console.log("\n\n\n\n")


// --- Test 2: Encrypt using public key ---
console.log(" --- Test 2: Encrypt using public key --- \n")
let publicKey = keys.public
let encryptedText = encrypt( "This is some super top secret text!", publicKey )
console.log(encryptedText)
console.log("\n\n\n\n")


// --- Test 3: Decrypt using private key ---
console.log(" --- Test 3: Decrypt using private key --- \n")
let privateKey = keys.private
let decryptedText = decrypt( encryptedText, privateKey)
console.log(decryptedText)
console.log("\n\n\n\n")

