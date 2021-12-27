const bip39 = require('bip39-light');
const { derivePath } = require('near-hd-key');
const bs58 = require('bs58');
const nacl = require('tweetnacl');

const KEY_DERIVATION_PATH = "m/44'/397'/0'";

export const normalizeSeedPhrase = (seedPhrase: string) => seedPhrase.trim().split(/\s+/).map(part => part.toLowerCase()).join(' ')

export const parseSeedPhrase = (seedPhrase: string) => {
    const seed = bip39.mnemonicToSeed(normalizeSeedPhrase(seedPhrase))
    const { key } = derivePath(KEY_DERIVATION_PATH, seed.toString('hex'))
    const keyPair = nacl.sign.keyPair.fromSeed(key)
    const secretKey = 'ed25519:' + bs58.encode(Buffer.from(keyPair.secretKey))
    return secretKey
}
